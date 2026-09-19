// Patisserie Postcard: the finished cake is viewed from above, like a baker's real decorating board.
import { Download, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "../contexts/LocaleContext";

const colorClasses = {
  "Raspberry blush": "top-raspberry",
  "Vanilla ivory": "top-vanilla",
  "Soft peach": "top-peach",
  Cocoa: "top-cocoa",
};
const flavorClasses = {
  "Vanilla & raspberry": "flavour-raspberry",
  "Dark chocolate": "flavour-chocolate",
  "Lemon & elderflower": "flavour-citrus",
  "Pistachio & rose": "flavour-pistachio",
};
const decorationClasses = {
  "Fresh fruit": "top-fresh",
  "Floral detail": "top-floral",
  "Piped bows": "top-bows",
  "Minimal & modern": "top-minimal",
};
const sizeClass = (size = "") =>
  size.includes("10")
    ? "cake-size-10"
    : size.includes("6")
      ? "cake-size-6"
      : "cake-size-8";
const toppingAnchors = {
  Border: [
    [50, 8],
    [72, 18],
    [90, 50],
    [72, 82],
    [50, 92],
    [28, 82],
    [10, 50],
    [28, 18],
  ],
  Corners: [
    [21, 21],
    [79, 21],
    [79, 79],
    [21, 79],
  ],
  Centre: [
    [44, 44],
    [56, 44],
    [56, 56],
    [44, 56],
  ],
  Scatter: [
    [28, 30],
    [68, 24],
    [78, 54],
    [62, 76],
    [28, 68],
    [40, 48],
  ],
  Scattered: [
    [28, 30],
    [68, 24],
    [78, 54],
    [62, 76],
    [28, 68],
    [40, 48],
  ],
};
const decorationGlyphs = {
  "Fresh fruit": "fruit",
  "Floral detail": "flower",
  "Piped bows": "bow",
  "Minimal & modern": "dot",
};
const previewScale = (size = "") =>
  size.includes("10") ? 1 : size.includes("6") ? 0.72 : 0.86;
const escapeXml = (value = "") =>
  String(value).replace(
    /[<>&'"]/g,
    character =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character]
  );

function createExportSvg(values) {
  const color =
    {
      "Raspberry blush": "#d97996",
      "Vanilla ivory": "#efd9a4",
      "Soft peach": "#eaa68f",
      Cocoa: "#754535",
    }[values.color] || "#d97996";
  const flavor =
    {
      "Vanilla & raspberry": "#c74f6e",
      "Dark chocolate": "#4b2c25",
      "Lemon & elderflower": "#d5ad31",
      "Pistachio & rose": "#78915d",
    }[values.flavor] || "#c74f6e";
  const size =
    sizeClass(values.size) === "cake-size-10"
      ? 175
      : sizeClass(values.size) === "cake-size-6"
        ? 116
        : 145;
  const center = 210;
  const radius = size / 2;
  const messageY =
    values.textPosition === "Top arc"
      ? center - 36
      : values.textPosition === "Bottom arc"
        ? center + 45
        : center + 5;
  const dots =
    values.decorationPlacement === "Corners"
      ? [
          [130, 130],
          [290, 130],
          [130, 290],
          [290, 290],
        ]
      : values.decorationPlacement === "Border"
        ? [
            [210, 122],
            [272, 148],
            [298, 210],
            [272, 272],
            [210, 298],
            [148, 272],
            [122, 210],
            [148, 148],
          ]
        : values.decorationPlacement === "Centre"
          ? [
              [192, 188],
              [228, 188],
              [192, 226],
              [228, 226],
            ]
          : [
              [155, 155],
              [255, 150],
              [285, 230],
              [230, 280],
              [145, 255],
              [175, 225],
            ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="520" viewBox="0 0 420 520"><rect width="420" height="520" fill="#fff8f2"/><rect x="28" y="28" width="364" height="416" rx="24" fill="#f3e3d7" stroke="#cf9e8f" stroke-dasharray="6 5"/><text x="42" y="57" fill="#a93657" font-family="Georgia,serif" font-size="15" font-weight="bold">CAKELY · TOP VIEW</text><circle cx="210" cy="210" r="${radius + 14}" fill="#fff9f2" stroke="#d8b5a8" stroke-width="4"/><circle cx="210" cy="210" r="${radius}" fill="${color}"/><circle cx="210" cy="210" r="${radius - 15}" fill="none" stroke="#fffaf3" stroke-width="7" stroke-dasharray="4 4"/><circle cx="210" cy="210" r="${radius - 34}" fill="${flavor}" opacity=".36"/>${dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#fff7ef" stroke="${flavor}" stroke-width="3"/>`).join("")}<text x="210" y="${messageY}" text-anchor="middle" fill="#5e3440" font-family="Georgia,serif" font-style="italic" font-size="18">${escapeXml(values.message || "Your message")}</text><text x="42" y="475" fill="#6d4d42" font-family="Arial,sans-serif" font-size="12">${escapeXml(values.size)} · ${escapeXml(values.flavor)} · ${escapeXml(values.decoration)}</text></svg>`;
}

export default function LiveCakePreview({ values }) {
  const { t, labelOf } = useLocale();
  const shape = values.shape?.toLowerCase() || "round";
  const typeClass =
    values.cakeType === "Wedding cake"
      ? "cake-type-wedding"
      : values.cakeType === "Cupcake collection"
        ? "cake-type-cupcakes"
        : "cake-type-celebration";
  const decoratorClass = `${colorClasses[values.color] || "top-raspberry"} ${flavorClasses[values.flavor] || "flavour-raspberry"} ${decorationClasses[values.decoration] || "top-minimal"} decoration-${values.decorationPlacement?.toLowerCase().replaceAll(" ", "-") || "border"}`;
  const frosting =
    values.frosting === "Textured finish"
      ? "top-textured"
      : values.frosting === "Whipped cream"
        ? "top-whipped"
        : "top-silky";
  const messagePlacement = `message-${values.textPosition?.toLowerCase().replaceAll(" ", "-") || "center"}`;
  const placement = values.decorationPlacement || "Border";
  const anchors = toppingAnchors[placement] || toppingAnchors.Border;
  const shapeStyle = {
    "--cake-scale": previewScale(values.size),
    "--topping-count": anchors.length,
  };
  function downloadDesign() {
    const url = URL.createObjectURL(
      new Blob([createExportSvg(values)], { type: "image/svg+xml" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "cakely-cake-design.svg";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast.success(t("preview.downloaded"));
  }
  async function shareDesign() {
    const shareData = {
      title: "My Cakely design",
      text: `A ${values.size} ${values.color} ${values.cakeType} with ${values.flavor} and ${values.decoration}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`
        );
        toast.success(t("preview.shareCopied"));
      }
    } catch (error) {
      if (error.name !== "AbortError") toast.error(t("preview.shareFailed"));
    }
  }
  return (
    <div
      className="top-preview"
      aria-live="polite"
      aria-label={`${t("preview.title")}: ${labelOf(values.size)}, ${labelOf(values.shape)}, ${labelOf(values.color)}, ${labelOf(values.flavor)}, ${labelOf(values.decoration)}`}
    >
      <div className="top-preview-head">
        <div>
          <span>{t("preview.title")}</span>
          <small>{t("preview.note")}</small>
        </div>
        <Sparkles size={16} />
      </div>
      <div className="top-preview-board">
        <div
          style={shapeStyle}
          className={`top-cake ${typeClass} ${sizeClass(values.size)} top-shape-${shape} ${decoratorClass} ${frosting}`}
        >
          <span className="top-icing-ring" />
          <span className="top-piped-border" />
          <span className="top-flavour-pool" />
          {typeClass === "cake-type-wedding" && (
            <>
              <span className="wedding-tier wedding-tier-outer" />
              <span className="wedding-tier wedding-tier-inner" />
            </>
          )}
          {typeClass === "cake-type-cupcakes" && (
            <div className="top-cupcake-ring">
              {Array.from({ length: 7 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
          )}
          <div
            className={`top-toppings topping-style-${decorationGlyphs[values.decoration] || "dot"}`}
            aria-hidden="true"
          >
            {anchors.map(([left, top], index) => (
              <i
                key={`${left}-${top}-${index}`}
                style={{ left: `${left}%`, top: `${top}%` }}
              />
            ))}
          </div>
          {values.message && (
            <span className={`top-cake-message ${messagePlacement}`}>
              {values.message}
            </span>
          )}
          <span className="preview-size-mark">
            {values.size?.split(" · ")[0]}
          </span>
        </div>
      </div>
      <div className="top-preview-legend">
        <span>
          <small>{t("preview.size")}</small>
          {values.size?.split(" · ")[0]}
        </span>
        <span>
          <small>{t("preview.shape")}</small>
          {labelOf(values.shape)}
        </span>
        <span>
          <small>{t("preview.color")}</small>
          {labelOf(values.color)}
        </span>
        <span>
          <small>{t("preview.finish")}</small>
          {labelOf(values.frosting)}
        </span>
        <span>
          <small>{t("preview.flavor")}</small>
          {labelOf(values.flavor)}
        </span>
        <span>
          <small>{t("preview.topping")}</small>
          {labelOf(values.decoration)}
        </span>
      </div>
      <div className="top-preview-actions">
        <button type="button" onClick={downloadDesign}>
          <Download size={15} /> {t("preview.export")}
        </button>
        <button type="button" onClick={shareDesign}>
          <Share2 size={15} /> {t("preview.share")}
        </button>
      </div>
    </div>
  );
}
