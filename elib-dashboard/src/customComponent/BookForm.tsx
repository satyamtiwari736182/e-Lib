import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { deleteBook } from '@/http/api';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const BookForm = ({ form, onSubmit, mutation, coverImageRef, fileRef, submit }) => {
    const param = useParams();

    const navigate = useNavigate();
    const deleteMutation = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => {
            console.log('Book deleted successfully');
            navigate('/dashboard/books');
        }
    })

    return <section>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{submit === "Edit" ? "Edit" : "Create"}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex items-center gap-4 ">
                        <Link to="/dashboard/books">
                            <Button variant={'ghost'} className='text-foreground'>
                                <span className="ml-2">Cancel</span>
                            </Button>
                        </Link>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending && <LoaderCircle className="animate-spin" />}
                            <span className="ml-2">{submit || "Submit"}</span>
                        </Button>
                        {submit === "Edit" && <Button type="button" variant="default" onClick={() => deleteMutation.mutate(param.id)} className=' bg-red-500'>Delete</Button>}
                    </div>
                </div>
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Create a new book</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new book.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input type="text" className="w-full" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Input type="text" className="w-full" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea className="min-h-32" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coverImage"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                className="w-full"
                                                {...coverImageRef}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="file"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Book File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                className="w-full"
                                                {...fileRef}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    </section>
}

export default BookForm