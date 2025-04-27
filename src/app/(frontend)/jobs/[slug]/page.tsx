// route jobs/jobs-slug
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/libs/shadcn/components/ui/card"
import Link from "next/link"
import ApplyJob from "@/app/(frontend)/jobs/[slug]/components/apply-job"

//params is slug name or anything like jobs/jobs-slug or jobs/full-stack . full-stack is slug (in url)
export default async function JobsPage({params}: {params:{slug: string}}) {

  const {slug} = params
  // config: config
  const payload = await getPayload({config})

  const jobsDoc = await payload.find({
    collection: 'jobs',
    where: {
      slug: {
        equals: slug
      }
    },
    pagination: false,
    depth: 0
  })

  const otherJobsDoc = await payload.find({
    collection: 'jobs',
    where: {
      slug: {
        not_equals: slug,
      },
    },
    pagination: false,
    depth: 0,
  })

  // console.log(jobsDoc)
    if(jobsDoc && jobsDoc.totalDocs> 0){
      return (

        <Card className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 gap-4 mt-10">
  {/* Left Section: Job Details */}
  <Card className="lg:basis-2/3 w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold">{jobsDoc.docs[0].title}</CardTitle>
      <CardDescription>{jobsDoc.docs[0].description}</CardDescription>
    </CardHeader>
    <CardContent>
      <h2 className="text-xl font-bold mb-2">Job Summary</h2>
      <p className="text-sm text-muted-foreground">
        We are seeking a motivated  Developer Intern to contribute to our dynamic development team.
        This role is ideal for someone eager to apply their knowledge and expand their skills in a real-world setting.
        Candidates with prior experience in React and Next.js who have a solid portfolio are highly encouraged to apply.
      </p>
    </CardContent>
  </Card>

  {/* Right Section: Other Jobs */}
  <Card className="lg:basis-1/3 w-full">
  <ApplyJob job={jobsDoc.docs[0]} />


    {otherJobsDoc && (
      <>
        <h2 className="text-2xl font-bold mb-4 text-center mt-5">Other Jobs</h2>
        <div className="space-y-4">
          {otherJobsDoc.docs.map(({ id, title, description, slug }) => (
            <Link href={`/jobs/${slug}`} key={id}>
              <Card className="hover:shadow-md transition-all duration-200 mx-4 mb-4">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </>
    )}
  </Card>
</Card>


      )
    }
    return <div>No job found</div>
  
  }
  