// Patisserie Postcard: reference-image input is clear, safe, and kept inside the guided cake consultation.
import { ImagePlus, LoaderCircle, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { classNames } from "../lib/format";
import { useLocale } from "../contexts/LocaleContext";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function ImageUpload({ value, onChange }) {
  const { t } = useLocale();
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  function handleFile(file) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) { setError(t("validation.imageType")); return; }
    if (file.size > MAX_SIZE) { setError(t("validation.imageSize")); return; }
    setError(""); setUploading(true);
    const reader = new FileReader();
    reader.onload = () => { window.setTimeout(() => { onChange(reader.result); setUploading(false); }, 420); };
    reader.readAsDataURL(file);
  }

  return <div>
    {value ? <div className="upload-preview"><img src={value} alt={t("custom.picture")} /><button type="button" className="icon-button" onClick={() => onChange("")} aria-label={t("custom.removePicture")}><Trash2 size={16} /></button></div> : <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]); }} className={classNames("upload-dropzone", error && "upload-error")}>
      {uploading ? <LoaderCircle className="animate-spin text-[#c93f63]" /> : <UploadCloud className="text-[#c93f63]" />}
      <span className="font-semibold">{uploading ? "Preparing preview..." : "Drop a reference here, or browse"}</span><span className="text-xs text-[#7d6258]">JPEG, PNG, or WEBP · up to 5 MB</span><ImagePlus size={15} className="mt-1 text-[#c93f63]" />
    </button>}
    <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleFile(event.target.files[0])} />
    {error && <p className="field-error">{error}</p>}
  </div>;
}
