import * as Yup from 'yup'

export const StoreSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
    logo: Yup.string().required(),
    image: Yup.string().required(),
    whatsApp_number: Yup.number().required(),
    call_number: Yup.number().required(),
    order_link: Yup.string().url().required(),
    categories: Yup.array().of(Yup.string().required()).required(),
})
