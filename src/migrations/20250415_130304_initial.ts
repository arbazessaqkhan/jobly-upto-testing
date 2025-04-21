import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'


export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {

  //undefined user initially
  console.log('user: ', req?.user) 

  const adminDoc = await payload.create({
    collection: 'users',  //required
    data: {
      //required
      email: 'admin@gmail.com',
      password: '12345',
      name: 'admin',
      role: 'admin',
      active: true
    }
  })

  const jmDoc = await payload.create({
    collection: 'users',  //required
    data: {
      //required
      email: 'jm@gmail.com',
      password: '12345',
      name: 'jm',
      role: 'job-manager',
      active: true,
      
    }
  })

  const appDoc = await payload.create({
    collection: 'users',  //required
    data: {
      //required
      email: 'am@gmail.com',
      password: '12345',
      name: 'am',
      role: 'application-manager',
      active: true,
      
    }
  })
  
  
  const quesDoc1 = await payload.create({
    collection: 'users',  //required
    data: {
      //required
      email: 'qm1@gmail.com',
      password: '12345',
      name: 'qm1',
      role: 'question-manager1',
      active: true,
    }
  })

  const quesDoc2 = await payload.create({
    collection: 'users',  //required
    data: {
      //required
      email: 'qm2@gmail.com',
      password: '12345',
      name: 'qm2',
      role: 'question-manager2',
      active: true,
    }
  })

  const assessDoc = await payload.create({
    collection: 'users',  //required
    data: {
      //required
      email: 'asm@gmail.com',
      password: '12345',
      name: 'asm',
      role: 'assessment-manager',
      active: true,
    }
  })

  // payload obj gives access to local api
  // NOT RECOMMENDED TO INSERT DATA IN MIGRATIONS
  //THIS IS ONLY FOR SCHEMA CHANGES
  const jobDoc1 = await payload.create({
    collection: 'jobs',  //required
    data: {
      //required
      title: 'React',
      description: 'Join our team',
      location: 'hybrid',
      salary: 2000,
      createdBy: jmDoc.id,
      updatedBy: jmDoc.id
    }
  })

  const jobDoc2 = await payload.create({
    collection: 'jobs',  //required
    data: {
      //required
      title: 'SE',
      description: 'Join our team',
      location: 'hybrid',
      salary: 2000,
      createdBy: jmDoc.id,
      updatedBy: jmDoc.id
    }
  })

  const jobDoc3 = await payload.create({
    collection: 'jobs',  //required
    data: {
      //required
      title: 'FSD',
      description: 'Join our team',
      location: 'hybrid',
      salary: 2000,
      createdBy: jmDoc.id,
      updatedBy: jmDoc.id
    }
  })

  const questionDoc1 = await payload.create({
    collection: 'questions',
    data: {
        title: 'what is react?',
        description: 'explain concept of react',
        duration: 30,
        questionType: 'mcq',
        options: [
          {
            option: 'frontend lib',
            isCorrect: true
          },
          {
            option: 'backend lib',
            isCorrect: false
          },
          {
            option: 'framework',
            isCorrect: false
          }
        ],
        createdBy: quesDoc1.id,
        updatedBy: quesDoc1.id
    }
  })

  const questionDoc2 = await payload.create({
    collection: 'questions',
    data: {
        title: 'what is node.js?',
        description: 'explain concept of node',
        duration: 30,
        questionType: 'essay',
        response: 'writa a short essay',
        createdBy: quesDoc2.id,
        updatedBy: quesDoc2.id
    },
    
  })

  const questionDoc3 = await payload.create({
    collection: 'questions',
    data: {
        title: 'what is next.js?',
        description: 'explain concept of next',
        duration: 30,
        questionType: 'mcq',
        options: [
          {
            option: 'frontend lib',
            isCorrect: false
          },
          {
            option: 'backend lib',
            isCorrect: true
          },
          {
            option: 'framework',
            isCorrect: false
          }
        ],
        createdBy: quesDoc1.id,
        updatedBy: quesDoc1.id
    }
  })

  const assessmentDoc1 = await payload.create({
    collection: 'assessments',  //required
    data: {
      //required
      title: 'React assessment',
      description: 'assessment for react',
      job: jobDoc1.id,
      questions: [
        questionDoc1.id,
        questionDoc2.id
      ],
      createdBy: assessDoc.id,
      updatedBy: assessDoc.id
    }
  })



  const assessmentDoc2 = await payload.create({
    collection: 'assessments',  //required
    data: {
      //required
      title: 'FSD',
      description: 'Join our team',
      job: jobDoc3.id,
      questions: [
        questionDoc1.id,
        questionDoc3.id
      ],
      createdBy: assessDoc.id,
      updatedBy: assessDoc.id
    }
  })

  const jobApplicationDoc1 = await payload.create({
    collection: 'job_applications',  //required
    data: {
      //required
      name: 'John Doe',
      email: 'hello@gmail.com',
      job: jobDoc1.id,
      // cv: 'https://payloadcms.com',
      status: 'applied',
      createdBy: appDoc.id,
      updatedBy: appDoc.id
    }
  })

  const jobApplicationDoc2 = await payload.create({
    collection: 'job_applications',  //required
    data: {
      //required
      name: 'John Doe',
      email: 'hello@gmail.com',
      job: jobDoc2.id,
      // cv: 'https://payloadcms.com',
      status: 'interviewing',
      createdBy: appDoc.id,
      updatedBy: appDoc.id
    },
    
  })  
  
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Migration code
}
