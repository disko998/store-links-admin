import * as Yup from 'yup'

export const AddStoreSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Too Long!').required(),
    title: Yup.string().max(50, 'Too Long!').required(),
    logo: Yup.string().required(),
    image: Yup.string().required(),
    whatsApp_number: Yup.number().required(),
    call_number: Yup.number().required(),
    order_link: Yup.string().url(),
    categories: Yup.array().of(Yup.string().required()).required(),
    country: Yup.string().required(),
})

export const EditStoreSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Too Long!').required(),
    title: Yup.string().max(50, 'Too Long!').required(),
    whatsApp_number: Yup.number().required(),
    call_number: Yup.number().required(),
    order_link: Yup.string().url(),
    categories: Yup.array().of(Yup.string().required()).required(),
    country: Yup.string().required(),
})

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
})
