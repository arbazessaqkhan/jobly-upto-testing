import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/libs/shadcn/components/ui/card"
import Link from "next/link"
import { getPayload } from "payload"
import config from '@payload-config'


export default async function JobsPage() {
  const payload = await getPayload({ config })

  const jobsDoc = await payload.find({
    collection: 'jobs',
    pagination: false,
    depth: 0
  })


  return (
    <div className="mt-15">
      {
        jobsDoc.docs.map(({id, title, description, slug}) => (
        <Link key={id} href={`/jobs/${slug}`}>
          <Card className="mx-auto max-w-3xl mb-5">
            <CardHeader>
              <CardTitle style={{ fontSize: '1.5rem' }}>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        ))
      }
      
    </div>
  )
}
