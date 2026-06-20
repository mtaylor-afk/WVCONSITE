/* ==========================================================================
   WV Construction — central business config
   Single source of truth for contact + brand data used by interactive JS.
   Critical textual content also lives in each page's HTML (never JS-only).
   Values marked VERIFY must be confirmed before the site is flipped to indexable.
   ========================================================================== */
window.WV = {
  brandName: "WV Construction",
  legalEntity: "ACOR Building & Property Solutions Ltd",
  companyNumber: "09287377",
  registeredOffice: "VERIFY BEFORE LAUNCH",            // VERIFY
  tradingNameStatement: "WV Construction is a trading name of ACOR Building & Property Solutions Ltd.",

  // Contact — all VERIFY before launch
  phone: "0151 200 1341",                              // VERIFY
  phoneHref: "+441512001341",                          // VERIFY
  mobile: "07966 978824",                              // VERIFY
  whatsapp: "447966978824",                            // VERIFY (intl format, no +)
  email: "antonycor@hotmail.co.uk",                    // VERIFY

  serviceArea: "CH and L postcodes only",
  coveragePrefixes: ["CH", "L"],

  myBuilderUrl: "https://www.mybuilder.com/profile/wvatc61/reviews?page=1",
  myBuilderRating: "5/5",                              // VERIFY
  myBuilderReviewCount: "13",                          // VERIFY

  tailoredQuoteUrl: "https://tailoredquote.co.uk/",
  visualiserBackendStatus: "not connected / pending",

  accreditations: [],                                  // none unless verified
  insuranceStatus: "VERIFY BEFORE LAUNCH",             // VERIFY

  indexable: false                                     // pre-launch: site is noindex until facts verified
};

/* Build a wa.me deep link with a prefilled message */
window.WV.waLink = function (message) {
  return "https://wa.me/" + window.WV.whatsapp + "?text=" + encodeURIComponent(message || "");
};

/* Build a mailto link */
window.WV.mailLink = function (subject, body) {
  return "mailto:" + window.WV.email +
    "?subject=" + encodeURIComponent(subject || "") +
    "&body=" + encodeURIComponent(body || "");
};
