export default function Preview({ url }: { url: string }) {
  return (
    <div className="py-2">
      <img
        alt="preview"
        src={(process.env.CDN_HOST || "") + url}
        width={100}
        height={100}
      />
    </div>
  );
}
