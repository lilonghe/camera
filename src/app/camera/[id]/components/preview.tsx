export default function Preview({ url }: { url: string }) {
  return (
    <div>
      <img
        alt="preview"
        src={(process.env.CDN_HOST || "") + url}
        width={100}
        className="transition-all duration-300 hover:scale-150"
      />
    </div>
  );
}
