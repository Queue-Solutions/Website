// Demo video with a poster frame; nothing is downloaded until the visitor presses play.
export default function DemoVideo({ orientation = "landscape", poster, src, title }) {
  const portrait = orientation === "portrait";

  return (
    <figure className={`mx-auto w-full ${portrait ? "max-w-[20rem]" : "max-w-5xl"}`}>
      <div
        className={`overflow-hidden border border-slate-200 bg-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.2)] ${
          portrait ? "rounded-[2.25rem] border-[6px] border-slate-900" : "rounded-[1.75rem]"
        }`}
      >
        <video
          className={`block w-full ${portrait ? "aspect-[9/16]" : "aspect-video"} object-cover`}
          controls
          playsInline
          preload="none"
          poster={poster}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      {title ? <figcaption className="mt-3 text-center text-sm font-medium text-slate-500">{title}</figcaption> : null}
    </figure>
  );
}
