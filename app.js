/**
 * app.js — 화면 렌더링 / 필터 / 정렬 / 지연 로딩 / 입력 이벤트
 * 데이터 읽기·검증은 db.js의 WorksDB에 위임하고, 변경 내용은 코드로 생성합니다.
 */
(() => {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const DB = window.WorksDB;
  const PAGE_SIZE = 12;
  const state = { status: "all", type: "애니메이션", sort: "name", query: "", filtered: [], shown: 0 };
  const grid = $("#work-grid");
  const dialog = $("#work-dialog");
  const detailDialog = $("#detail-dialog");
  const form = $("#work-form");
  const sentinel = $("#load-sentinel");
  const collator = new Intl.Collator("ko", { numeric: true, sensitivity: "base" });
  let toastTimer;
  let searchTimer;
  let lastFocused;
  let observer;
  let detailWorkId = null;

  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  const imageURL = filename => filename ? `img/${encodeURIComponent(filename)}` : "img/default.svg";
  const formatRating = value => Number(value).toFixed(1);

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
  }

  function showGeneratedCode(title, description, code) {
    $("#code-result-title").textContent = title;
    $("#code-result-description").textContent = description;
    $("#generated-code").textContent = code;
    $("#code-result").hidden = false;
    $("#code-result").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function initializeTypeOptions() {
    const filter = $("#type-filter");
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "모든 유형";
    filter.replaceChildren(allOption);

    const choices = $(".type-options");
    choices.replaceChildren();
    DB.types.forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      filter.append(option);

      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "types";
      input.value = type;
      const text = document.createElement("span");
      text.textContent = type;
      label.append(input, text);
      choices.append(label);
    });
  }
  initializeTypeOptions();
  $("#type-filter").value = state.type;

  const favoriteBadgeContent = '<svg class="badge-emblem" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 7 5 4 4-7 4 7 5-4-2 11H5z"/><path d="M6 21h12M8 15h8"/><path d="M12 11v3"/></svg><span class="badge-label">인생작</span>';

  function cardTemplate(work) {
    const title = escapeHTML(work.title);
    const rating = formatRating(work.rating);
    return `<article class="work-card${work.status === "watching" ? " is-watching" : ""}${work.lifeWork ? " is-life-work" : ""}">
      <button type="button" class="card-open" data-id="${escapeHTML(work.id)}" aria-label="${title} 상세 정보 보기">
        <div class="poster-wrap">
          <img class="poster" src="${imageURL(work.image)}" alt="${title} 포스터" loading="lazy" decoding="async" width="400" height="600">
          ${work.lifeWork ? '<span class="favorite-aura" aria-hidden="true"></span>' : ""}
          ${work.status === "watching" ? '<span class="watching-badge" title="감상 중"><span class="badge-signal" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="badge-copy"><span class="badge-kicker" aria-hidden="true">NOW WATCHING</span><span class="badge-label">감상 중</span></span></span>' : ""}
          ${work.lifeWork ? `<span class="life-work-badge life-work-left" aria-label="인생작">${favoriteBadgeContent}</span>` : ""}
        </div>
        <div class="card-types">${work.types.map(escapeHTML).join(' · ')}</div>
        <h3 class="card-title" title="${title}">${title}</h3>
        <div class="card-rating" aria-hidden="true"><span class="rating-stars" style="--rating:${work.rating * 20}%"><span>★★★★★</span><span class="stars-fill">★★★★★</span></span><span class="rating-value">${rating}</span></div>
        ${work.review ? `<p class="card-review" title="${escapeHTML(work.review)}">${escapeHTML(work.review)}</p>` : ""}
      </button>
      <button type="button" class="card-edit" data-id="${escapeHTML(work.id)}" aria-label="${title} 수정"><svg class="icon"><use href="#i-edit"/></svg></button>
    </article>`;
  }

  // 깨지거나 존재하지 않는 이미지도 카드 비율을 유지한 채 기본 이미지로 대체.
  function handleImageError(event) {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    if (!image.dataset.fallback) {
      image.dataset.fallback = "true";
      image.src = "img/default.svg";
    }
  }
  document.addEventListener("error", handleImageError, true);

  function appendNextPage() {
    if (state.shown >= state.filtered.length) return;
    const batch = state.filtered.slice(state.shown, state.shown + PAGE_SIZE);
    grid.insertAdjacentHTML("beforeend", batch.map(cardTemplate).join(""));
    state.shown += batch.length;
    const hasMore = state.shown < state.filtered.length;
    sentinel.hidden = !hasMore;
    $("#list-end").hidden = hasMore || !state.filtered.length;
    $("#loaded-count").textContent = state.filtered.length;
    $("#list-announcement").textContent = `${state.filtered.length}개 중 ${state.shown}개 작품 표시`;
    if (!hasMore && observer) observer.unobserve(sentinel);
  }

  function render() {
    const all = DB.getAll();
    $("#count-all").textContent = all.length;
    $("#count-watching").textContent = all.filter(work => work.status === "watching").length;
    $("#count-completed").textContent = all.filter(work => work.status === "completed").length;
    const query = state.query.trim().normalize("NFC").toLocaleLowerCase("ko");
    state.filtered = all.filter(work =>
      (state.status === "all" || work.status === state.status) &&
      (state.type === "all" || work.types.includes(state.type)) &&
      (state.sort !== "life-work-only" || work.lifeWork) &&
      (state.sort !== "watched" || !!work.watchedAt) &&
      (!query || work.title.normalize("NFC").toLocaleLowerCase("ko").includes(query))
    );
    state.filtered.sort((a, b) => {
      if (state.sort === "watched") return b.watchedAt.localeCompare(a.watchedAt) || Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (state.sort === "name" || state.sort === "life-work-only") return collator.compare(a.title, b.title) || Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (state.sort === "rating-high") return b.rating - a.rating || collator.compare(a.title,b.title);
      if (state.sort === "rating-low") return a.rating - b.rating || collator.compare(a.title,b.title);
      return Date.parse(b.createdAt) - Date.parse(a.createdAt) || collator.compare(a.title,b.title);
    });
    $("#result-count").textContent = state.filtered.length;
    grid.replaceChildren();
    state.shown = 0;
    const empty = !state.filtered.length;
    $("#empty-state").hidden = !empty;
    $("#list-end").hidden = true;
    sentinel.hidden = empty;
    if (empty) {
      const hasAny = all.length > 0;
      $("#empty-title").textContent = hasAny ? "조건에 맞는 작품이 없어요" : "아직 기록한 작품이 없어요";
      $("#empty-description").textContent = hasAny
        ? (state.sort === "watched" ? "최근에 본 순에서는 본 날짜가 기록된 작품만 표시합니다." : "검색어를 바꾸거나 필터를 초기화해 보세요.")
        : "좋아하는 이야기부터 하나씩 모아보세요.";
      $("#empty-action").textContent = hasAny ? "필터 초기화" : "첫 작품 추가하기";
      $("#list-announcement").textContent = "표시할 작품이 없습니다.";
    }
    if (observer) observer.unobserve(sentinel);
    appendNextPage();
    if (observer && !sentinel.hidden) observer.observe(sentinel);
  }

  function updateRating() {
    const value = Number($("#work-rating").value);
    $("#rating-output").value = formatRating(value);
    $("#work-rating").setAttribute("aria-valuetext", `${value}점`);
    $("#form-stars").style.setProperty("--rating", `${value * 20}%`);
  }

  function updatePreview() {
    const preview = $("#poster-preview");
    delete preview.dataset.fallback;
    try { preview.src = imageURL(DB.validateImage($("#work-image").value)); }
    catch (_) { preview.src = "img/default.svg"; }
  }

  function openEditor(work = null) {
    lastFocused = document.activeElement;
    form.reset();
    $("#work-id").value = work ? work.id : "";
    $("#work-title").value = work ? work.title : "";
    $("#work-image").value = work ? work.image : "";
    $("#work-namuwiki-url").value = work ? work.namuWikiUrl : "";
    $("#work-date").value = work ? work.watchedAt : "";
    $("#work-status").value = work ? work.status : "completed";
    $("#work-rating").value = work ? work.rating : 5;
    $("#work-review").value = work ? work.review : "";
    $("#work-long-review").value = work ? work.longReview : "";
    $("#work-life-work").checked = !!work && work.lifeWork;
    $("#review-length").textContent = $("#work-review").value.length;
    $$('input[name="types"]').forEach(input => input.checked = !!work && work.types.includes(input.value));
    $("#dialog-title").textContent = work ? "작품 수정 코드 만들기" : "새로운 작품 코드 만들기";
    $(".dialog-heading .eyebrow").textContent = work ? "MY CHAPTER" : "A NEW CHAPTER";
    $("#delete-button").hidden = !work;
    $("#form-error").hidden = true;
    updateRating();
    updatePreview();
    dialog.showModal();
    document.body.classList.add("modal-open");
    dialog.scrollTop = 0;
    $("#work-title").focus({ preventScroll: true });
  }

  function openDetails(work) {
    detailWorkId = work.id;
    $("#detail-title").textContent = work.title;
    const poster = $("#detail-poster");
    delete poster.dataset.fallback;
    poster.src = imageURL(work.image);
    poster.alt = `${work.title} 포스터`;
    const lifeWorkBadge = $("#detail-life-work-badge");
    lifeWorkBadge.hidden = !work.lifeWork;
    lifeWorkBadge.className = "life-work-badge life-work-left";
    lifeWorkBadge.innerHTML = favoriteBadgeContent;
    $("#detail-favorite-aura").hidden = !work.lifeWork;
    $("#detail-types").textContent = work.types.join(" · ");
    $("#detail-status").textContent = work.status === "watching" ? "감상 중" : "감상 완료";
    $("#detail-date").textContent = work.watchedAt ? `본 날짜 · ${work.watchedAt}` : "본 날짜 기록 없음";
    $("#detail-rating").textContent = `별점 · ${formatRating(work.rating)} / 5`;
    const namuWikiLink = $("#detail-namuwiki-link");
    namuWikiLink.hidden = !work.namuWikiUrl;
    if (work.namuWikiUrl) namuWikiLink.href = work.namuWikiUrl;
    else namuWikiLink.removeAttribute("href");
    const review = $("#detail-review");
    review.textContent = work.review || "";
    review.hidden = !work.review;
    $("#detail-long-review").textContent = work.longReview || "";
    $("#detail-long-section").hidden = !work.longReview;
    detailDialog.showModal();
    document.body.classList.add("modal-open");
  }

  function closeEditor() { dialog.close(); }
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (lastFocused && lastFocused.isConnected) lastFocused.focus({ preventScroll: true });
    else $("#add-button").focus({ preventScroll: true });
  });
  detailDialog.addEventListener("close", () => {
    if (!dialog.open) document.body.classList.remove("modal-open");
  });
  $("#close-detail").addEventListener("click", () => detailDialog.close());
  $("#detail-edit").addEventListener("click", () => {
    const work = DB.getById(detailWorkId);
    if (!work) return;
    detailDialog.close();
    openEditor(work);
    lastFocused = [...grid.querySelectorAll(".card-edit")].find(button => button.dataset.id === work.id) || $("#add-button");
  });
  // 바깥 영역에서 시작하고 끝나는 클릭만 닫기 처리 (입력 중 드래그는 제외).
  let pointerStartedOutside = false;
  const isOutside = event => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };
  dialog.addEventListener("pointerdown", event => { pointerStartedOutside = isOutside(event); });
  dialog.addEventListener("click", event => {
    if (event.target === dialog && pointerStartedOutside && isOutside(event)) closeEditor();
  });

  $("#add-button").addEventListener("click", () => openEditor());
  $("#close-dialog").addEventListener("click", closeEditor);
  $("#cancel-dialog").addEventListener("click", closeEditor);
  grid.addEventListener("click", event => {
    const editButton = event.target.closest(".card-edit");
    if (editButton) {
      const work = DB.getById(editButton.dataset.id);
      if (work) openEditor(work);
      return;
    }
    const button = event.target.closest(".card-open");
    if (!button) return;
    const work = DB.getById(button.dataset.id);
    if (work) openDetails(work);
  });

  $$(".status-tab").forEach(tab => tab.addEventListener("click", () => {
    state.status = tab.dataset.status;
    $$(".status-tab").forEach(button => {
      const active = button === tab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    render();
  }));
  $("#type-filter").addEventListener("change", event => { state.type = event.target.value; render(); });
  $("#sort-select").addEventListener("change", event => { state.sort = event.target.value; render(); });
  $("#search-input").addEventListener("input", event => {
    state.query = event.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 130);
  });
  $("#empty-action").addEventListener("click", () => {
    if (!DB.getAll().length) { openEditor(); return; }
    clearTimeout(searchTimer);
    state.status = "all"; state.type = "애니메이션"; state.sort = "name"; state.query = "";
    $("#type-filter").value = "애니메이션";
    $("#sort-select").value = "name";
    $("#search-input").value = "";
    $$(".status-tab").forEach(tab => {
      const active = tab.dataset.status === "all";
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    render();
  });
  $("#load-more").addEventListener("click", appendNextPage);
  $("#work-rating").addEventListener("input", updateRating);
  $("#work-image").addEventListener("input", updatePreview);
  $("#work-review").addEventListener("input", () => { $("#review-length").textContent = $("#work-review").value.length; });

  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      const editing = !!$("#work-id").value;
      const record = DB.prepare({
        id: $("#work-id").value || undefined,
        title: $("#work-title").value,
        image: $("#work-image").value,
        namuWikiUrl: $("#work-namuwiki-url").value,
        watchedAt: $("#work-date").value,
        rating: Number($("#work-rating").value),
        review: $("#work-review").value,
        types: $$('input[name="types"]:checked').map(input => input.value),
        status: $("#work-status").value,
        longReview: $("#work-long-review").value,
        lifeWork: $("#work-life-work").checked
      });
      const code = JSON.stringify(record, null, 4);
      closeEditor();
      showGeneratedCode(
        editing ? "작품 수정 코드" : "작품 추가 코드",
        editing
          ? "아래 객체로 db.js의 INITIAL_WORKS에서 id가 같은 작품 객체를 통째로 바꾸세요."
          : "아래 객체를 db.js의 INITIAL_WORKS 배열 마지막 항목 뒤에 추가하세요. 기존 마지막 항목에 쉼표를 붙입니다.",
        code
      );
      showToast("JS 코드를 만들었어요. 복사해 db.js에 반영해 주세요.");
    } catch (error) {
      $("#form-error").textContent = error.message;
      $("#form-error").hidden = false;
      $("#form-error").scrollIntoView({ block: "nearest" });
    }
  });
  $("#delete-button").addEventListener("click", () => {
    const work = DB.getById($("#work-id").value);
    if (!work || !confirm(`‘${work.title}’ 삭제 코드를 만들까요?`)) return;
    closeEditor();
    showGeneratedCode(
      "작품 삭제 코드",
      "db.js에서 INITIAL_WORKS 배열 선언 바로 다음 줄에 아래 코드를 추가하세요.",
      `INITIAL_WORKS.splice(INITIAL_WORKS.findIndex(work => work.id === ${JSON.stringify(work.id)}), 1);`
    );
    showToast("삭제 JS 코드를 만들었어요.");
  });

  $("#copy-code").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("#generated-code").textContent);
      showToast("코드를 복사했어요.");
    } catch (_) {
      showToast("코드를 선택해 직접 복사해 주세요.");
    }
  });

  // 작품 DOM은 12개씩, 포스터는 브라우저의 lazy loading으로 각각 로드.
  // IntersectionObserver 미지원 환경에서도 '더 보기' 버튼으로 정상 작동합니다.
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) appendNextPage();
    }, { rootMargin: "0px", threshold: 0 });
  }
  render();
})();
