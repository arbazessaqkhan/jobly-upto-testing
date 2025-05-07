'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/libs/shadcn/components/ui/card'

import { Separator } from '@/libs/shadcn/components/ui/separator'
import CommonIcon from '@/libs/common/icon/CommonIcon'

export interface IconsTabProps {
  /**
   * Optional string prop for demonstration purposes
   */
  someProp?: string
}

// Reusable CodeBlock component
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-muted text-sm p-3 rounded-md mt-2 mb-6 overflow-x-auto">
    <code>{children}</code>
  </pre>
)

const IconsTab = ({ someProp }: IconsTabProps) => {
  return (
    <Card className="w-full my-5">
      <CardHeader>
        <CardTitle>🎯 Icon Component Showcase</CardTitle>
        <CardDescription>
          A preview of <code>CommonIcon</code> variants with example usage and prop reference.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h2 className="text-base font-medium mb-2">👤 Simple Icon</h2>
          <CommonIcon name="user" />
          <CodeBlock>{`<CommonIcon name="user" />`}</CodeBlock>
        </div>

        <div>
          <h2 className="text-base font-medium mb-2">📏 Icon with size=48</h2>
          <CommonIcon name="user" size="48" />
          <CodeBlock>{`<CommonIcon name="user" size="48" />`}</CodeBlock>
        </div>

        <div>
          <h2 className="text-base font-medium mb-2">🎨 Icon with color=red</h2>
          <CommonIcon name="user" color="red" />
          <CodeBlock>{`<CommonIcon name="user" color="red" />`}</CodeBlock>
        </div>

        <div>
          <h2 className="text-base font-medium mb-2">🔥 Icon with fill=red and color=red</h2>
          <CommonIcon name="user" fill="red" color="red" />
          <CodeBlock>{`<CommonIcon name="user" fill="red" color="red" />`}</CodeBlock>
        </div>

        <div>
          <h2 className="text-base font-medium mb-2">🟥 Icon with fill=red only</h2>
          <CommonIcon name="user" fill="red" />
          <CodeBlock>{`<CommonIcon name="user" fill="red" />`}</CodeBlock>
        </div>

        <div>
          <h2 className="text-base font-medium mb-2">🧱 Icon with fill=red and strokeWidth=3</h2>
          <CommonIcon name="user" fill="red" strokeWidth={3} />
          <CodeBlock>{`<CommonIcon name="user" fill="red" strokeWidth={3} />`}</CodeBlock>
        </div>

        <Separator className="my-6" />

        {/* PROPS DOCS */}
        <div className="prose max-w-none">
          <h3 className="text-xl font-bold mb-2">📘 Props Documentation</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <code>name</code> <em>(string)</em> — Name of the icon from the Lucide icon set.
            </li>
            <li>
              <code>size</code> <em>(string | number)</em> — Icon size in px. Defaults to 24.
            </li>
            <li>
              <code>color</code> <em>(string)</em> — Stroke color of the icon.
            </li>
            <li>
              <code>fill</code> <em>(string)</em> — Fill color (for solid areas).
            </li>
            <li>
              <code>strokeWidth</code> <em>(number)</em> — Controls the thickness of the stroke.
            </li>
          </ul>
        </div>

        {/* EXTERNAL LINK */}
        <div className="mt-4 text-sm text-muted-foreground">
          For more icon options and SVG attributes, see the{' '}
          <a
            href="https://lucide.dev/guide/packages/lucide-react"
            target="_blank"
            rel="noreferrer"
            className="underline font-medium"
          >
            Lucide React Docs
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default IconsTab