import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { editBook, getBook } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookForm from '@/customComponent/BookForm';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    genre: z.string().min(2, {
        message: 'Genre must be at least 2 characters.',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters.',
    }),
    coverImage: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Cover Image is required'),
    file: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Book PDF is required'),
});

const EditBook = () => {
    const navigate = useNavigate();
    const param = useParams();
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['book'],
        queryFn: () => getBook(param.id),
        staleTime: 1000, // in Milli-seconds
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data?.data.title,
            genre: data?.data.genre,
            description: data?.data.description,
        },
    });

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');



    const mutation = useMutation({
        mutationFn: (data: FormData) => editBook(data, param.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            console.log('Book updated successfully');
            navigate('/dashboard/books');
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formdata = new FormData();
        formdata.append('title', values.title);
        formdata.append('genre', values.genre);
        formdata.append('description', values.description);
        formdata.append('coverImage', values.coverImage[0]);
        formdata.append('file', values.file[0]);

        mutation.mutate(formdata);

    }

    return <>{!isLoading && <BookForm {...{ form, onSubmit, mutation, coverImageRef, fileRef, submit: "Edit" }} />}</>

};

export default EditBook;
