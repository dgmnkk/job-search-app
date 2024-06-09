'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(2).max(50),
  desiredJobTitle: Yup.string().required('Required').min(2).max(50),
  aboutMe: Yup.string().required('Required').min(2).max(500),
})

const CreateProfile = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Profile</h1>
      <Formik
        initialValues={{
          name: '',
          desiredJobTitle: '',
          aboutMe: '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={values => {
          localStorage.setItem('profile', JSON.stringify(values))
          router.push('/jobs')
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Field name="name" className="border p-2 rounded w-full" />
              {errors.name && touched.name ? <div className="text-red-500">{errors.name}</div> : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Desired Job Title</label>
              <Field name="desiredJobTitle" className="border p-2 rounded w-full" />
              {errors.desiredJobTitle && touched.desiredJobTitle ? <div className="text-red-500">{errors.desiredJobTitle}</div> : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">About Me</label>
              <Field as="textarea" name="aboutMe" className="border p-2 rounded w-full" />
              {errors.aboutMe && touched.aboutMe ? <div className="text-red-500">{errors.aboutMe}</div> : null}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateProfile
