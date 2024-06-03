import * as yup from "yup"

export const SignUpSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email("Invalid email address").required(),
    password: yup.string().min(8, "Password must be at least 8 characters").required(), 
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
  })
  .required()

export const SignInSchema = yup
.object({
  email: yup.string().email("Invalid email address").required(),
  password: yup.string().min(8, "Password must be at least 8 characters").required(), 
})
.required()

export const AddMovieSchema = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  description: yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  publishName: yup.string()
    .required('Publish Name is required')
    .min(3, 'Publish Name must be at least 3 characters long'),
  genre: yup.string()
    .required('Genre is required')
}).required()