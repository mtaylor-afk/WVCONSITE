/* ==========================================================================
   WV Construction — site interactivity (vanilla JS, no dependencies)
   Progressive enhancement only. All critical content lives in the HTML.
   ========================================================================== */
(function () {
  "use strict";
  var WV = window.WV || {};

  /* ---------- Footer year ---------- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Mobile navigation ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var backdrop = document.querySelector(".nav-backdrop");
  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    if (backdrop) backdrop.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = nav.querySelector("a, button");
      if (first) first.focus();
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
  }
  if (backdrop) backdrop.addEventListener("click", function () { setNav(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
  });
  if (nav) nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { if (window.innerWidth <= 980) setNav(false); });
  });

  /* ---------- Resources dropdown (desktop) / accordion (mobile) ---------- */
  function closeDropdown(dd) {
    dd.classList.remove("is-open");
    var b = dd.querySelector(".dropdown-toggle");
    if (b) b.setAttribute("aria-expanded", "false");
  }
  document.querySelectorAll("[data-dropdown]").forEach(function (dd) {
    var btn = dd.querySelector(".dropdown-toggle");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var open = !dd.classList.contains("is-open");
      dd.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll("[data-dropdown].is-open").forEach(function (dd) {
      if (!dd.contains(e.target)) closeDropdown(dd);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll("[data-dropdown].is-open").forEach(function (dd) {
      var b = dd.querySelector(".dropdown-toggle");
      closeDropdown(dd);
      if (b) b.focus();
    });
  });

  /* ---------- Postcode checker ---------- */
  document.querySelectorAll("[data-postcode-form]").forEach(function (form) {
    var input = form.querySelector("input");
    var result = form.parentNode.querySelector(".postcode-result") || form.querySelector(".postcode-result");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input || !result) return;
      var raw = (input.value || "").trim().toUpperCase().replace(/\s+/g, "");
      result.classList.add("is-shown");
      result.classList.remove("is-yes", "is-no");
      if (!raw) {
        result.classList.add("is-no");
        result.textContent = "Please enter a postcode so we can check it against our CH/L coverage.";
        return;
      }
      var prefix = (raw.match(/^[A-Z]+/) || [""])[0];
      var prefixes = WV.coveragePrefixes || ["CH", "L"];
      if (prefixes.indexOf(prefix) !== -1) {
        result.classList.add("is-yes");
        result.textContent = "Good news — " + raw + " looks inside our stated CH/L postcode coverage. Please send your details so WV Construction can confirm and quote.";
      } else {
        result.classList.add("is-no");
        result.textContent = "Sorry — " + raw + " appears outside WV Construction’s stated CH/L coverage. Please only enquire if the property is within a CH or L postcode.";
      }
    });
  });

  /* ---------- Image upload preview ---------- */
  document.querySelectorAll("[data-upload]").forEach(function (wrap) {
    var input = wrap.querySelector('input[type="file"]');
    var preview = wrap.parentNode.querySelector(".upload-preview");
    var errEl = wrap.parentNode.querySelector(".upload-error");
    if (!input) return;
    var okTypes = ["image/jpeg", "image/png", "image/webp"];
    var maxBytes = 10 * 1024 * 1024;

    function showError(msg) {
      if (errEl) { errEl.textContent = msg; }
      input.setAttribute("aria-invalid", "true");
    }
    function clearError() { if (errEl) errEl.textContent = ""; input.removeAttribute("aria-invalid"); }

    function handleFiles(files) {
      clearError();
      var file = files && files[0];
      if (!file) return;
      if (okTypes.indexOf(file.type) === -1) { showError("Please choose a JPEG, PNG or WebP image."); input.value = ""; return; }
      if (file.size > maxBytes) { showError("That image is over 10 MB. Please choose a smaller file."); input.value = ""; return; }
      if (preview) {
        var img = preview.querySelector("img") || document.createElement("img");
        img.alt = "Preview of the photo you selected";
        img.src = URL.createObjectURL(file);
        if (!img.parentNode) preview.appendChild(img);
        preview.classList.add("is-shown");
        var name = preview.querySelector(".upload-preview__name");
        if (name) name.textContent = file.name;
      }
    }
    input.addEventListener("change", function () { handleFiles(input.files); });
    ["dragenter", "dragover"].forEach(function (ev) {
      wrap.addEventListener(ev, function (e) { e.preventDefault(); wrap.classList.add("is-drag"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      wrap.addEventListener(ev, function (e) { e.preventDefault(); wrap.classList.remove("is-drag"); });
    });
    wrap.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files.length) { input.files = e.dataTransfer.files; handleFiles(e.dataTransfer.files); }
    });
    var removeBtn = wrap.parentNode.querySelector(".upload-remove");
    if (removeBtn) removeBtn.addEventListener("click", function () {
      input.value = ""; clearError();
      if (preview) { preview.classList.remove("is-shown"); var img = preview.querySelector("img"); if (img) img.removeAttribute("src"); }
    });
  });

  /* ---------- Lead forms: validate, then open a real WhatsApp / email send ----------
     No backend yet: we never fake a submission. We build a prefilled message and
     present real Send-via-WhatsApp / Send-via-email actions for the user to send. */
  document.querySelectorAll("form.js-lead-form").forEach(function (form) {
    var sendPanel = form.querySelector(".send-panel") || (form.parentNode && form.parentNode.querySelector(".send-panel"));

    function fieldLabel(el) {
      if (el.getAttribute("data-label")) return el.getAttribute("data-label");
      var id = el.id;
      if (id) { var l = form.querySelector('label[for="' + id + '"]'); if (l) return l.textContent.replace("*", "").trim(); }
      var wrapLabel = el.closest(".field") && el.closest(".field").querySelector(".field-label, label");
      if (wrapLabel) return wrapLabel.textContent.replace("*", "").trim();
      return el.name || "Detail";
    }

    function validate() {
      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (el) {
        var wrap = el.closest(".field") || el.parentNode;
        var err = wrap.querySelector(".error-msg");
        var valid = el.type === "checkbox" ? el.checked : String(el.value || "").trim() !== "";
        if (valid && el.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        if (!valid) {
          el.setAttribute("aria-invalid", "true");
          if (err) err.textContent = el.type === "checkbox" ? "Please tick to continue." : (el.type === "email" ? "Please enter a valid email address." : "This field is required.");
          if (!firstInvalid) firstInvalid = el;
        } else {
          el.removeAttribute("aria-invalid");
          if (err) err.textContent = "";
        }
      });
      return firstInvalid;
    }

    function buildMessage() {
      var lines = [];
      var intro = form.getAttribute("data-intro") || "Website enquiry for WV Construction.";
      lines.push(intro);
      lines.push("");
      form.querySelectorAll("input, select, textarea").forEach(function (el) {
        if (!el.name) return;
        if (el.classList.contains("hp")) return;                 // honeypot
        if (el.type === "file") {
          if (el.files && el.files.length) lines.push("Photo/plan: " + el.files[0].name + " (please attach it in this chat/email)");
          return;
        }
        if (el.type === "checkbox") {
          if (el.checked && !el.hasAttribute("data-consent")) lines.push(fieldLabel(el) + ": Yes");
          return;
        }
        if (el.type === "radio") { if (el.checked) lines.push(fieldLabel(el) + ": " + el.value); return; }
        var v = String(el.value || "").trim();
        if (v) lines.push(fieldLabel(el) + ": " + v);
      });
      return lines.join("\n");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Honeypot: silently stop bots
      var hp = form.querySelector(".hp");
      if (hp && hp.value) return;
      var bad = validate();
      if (bad) { bad.focus(); return; }

      var msg = buildMessage();
      var subject = form.getAttribute("data-subject") || "Website enquiry — WV Construction";
      var wa = WV.waLink ? WV.waLink(msg) : "#";
      var mail = WV.mailLink ? WV.mailLink(subject, msg) : "#";

      if (sendPanel) {
        var waBtn = sendPanel.querySelector(".send-wa");
        var mailBtn = sendPanel.querySelector(".send-mail");
        if (waBtn) waBtn.href = wa;
        if (mailBtn) mailBtn.href = mail;
        form.querySelectorAll(".form-actions").forEach(function (a) { a.classList.add("hide"); });
        sendPanel.classList.remove("hide");
        sendPanel.setAttribute("tabindex", "-1");
        sendPanel.focus();
        sendPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.location.href = wa;
      }
    });
  });

  /* ---------- Sticky CTA: don't obstruct forms ---------- */
  var hideTargets = document.querySelectorAll("input, textarea, select");
  hideTargets.forEach(function (el) {
    el.addEventListener("focus", function () { document.body.classList.add("sticky-hidden"); });
    el.addEventListener("blur", function () { document.body.classList.remove("sticky-hidden"); });
  });
})();
