import { Endpoint, PayloadRequest } from 'payload'
import React from 'react'
import { NextResponse } from 'next/server'
import { JobApplication } from '@/payload-types';
import { Media } from '@/payload-types';
import {File as FileType} from 'payload';

export const formJobEndpoint: Endpoint = {
    path: '/apply',
    method: 'post',
    handler: async (req: PayloadRequest) => {

      if (!req.formData) {
        return new Response("Invalid form data", { status: 400 });
      }  

      const formData = await req.formData();

      //or const formData = await req.formData?.();  
      //if (!formData) {
      //  return new Response("Invalid form data", { status: 400 });
      //}

      const name = formData.get('name')?.toString();
      const email = formData.get('email')?.toString();
      const phone = formData.get('phone')?.toString();
      const location = formData.get('location')?.toString();
      const job_id = formData.get('job_id')?.toString();
      const resume = formData.get('resume'); // file object
      //resumeName 
      //resumeName = resume instance of File? resume.name: null
  
      console.log({ name, email, phone, location, job_id, resume })

      let resumeFile: FileType | undefined | null

      if(resume instanceof File) {
        resumeFile = {
          data: Buffer.from(await resume.arrayBuffer()),
          mimetype: resume.type,
          name: resume.name,
          size: resume.size
        }
      }
      
      if(!resumeFile) {
        return new Response("Invalid resume file", { status: 400 });
      }

      let media;
      
      try{

        media = await req.payload.create({
          collection: 'media',
          data: {
            alt: `Resume of ${name}`,
          },
          file: resumeFile
        });
        
        const application = await req.payload.create({
          collection: 'job_applications',
          data: {
            name,
            email,
            phone,
            location,
            job: job_id,
            cv: media.id,
            status: 'applied'
          },
          // overrideAccess: true
        })
        return NextResponse.json({ 
          message: 'Application received successfully'
        })
      }catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create job application' }, { status: 500 });
      }
      
    }
    
  }
  


