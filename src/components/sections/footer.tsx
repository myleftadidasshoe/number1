import { FadeIn } from "@/components/motion/fade-in";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Let&apos;s create something extraordinary.
            </h2>
            <p className="mt-4 text-muted">number1 &mdash; Design & Motion Studio</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
