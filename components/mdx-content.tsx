import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import * as React from "react"

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 mb-4 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-6 mb-3 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 ml-6 list-disc text-muted-foreground [&>li]:mt-2"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 ml-6 list-decimal text-muted-foreground [&>li]:mt-2"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground" {...props} />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && href.startsWith("/")
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-primary underline underline-offset-4"
          {...props}
        />
      )
    }
    return (
      <Link
        href={href || ""}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4"
        {...props}
      />
    )
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-primary pl-6 text-muted-foreground italic"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-6 mb-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
}

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="mdx">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
