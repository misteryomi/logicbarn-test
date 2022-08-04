import { formatDate } from "@/Utils/helpers"
import { Link } from "@inertiajs/inertia-react"
  
export default function GridList({ blogs }) {
    return (
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Latest blog posts</h2>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            { blogs.length > 0 ? 
                blogs.map((blog, index) => (
                    <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                            <Link href={route('blogs.show', {blog})} className="block mt-2 text-green-600">
                            <p className="text-xl font-semibold ">{blog.title}</p>
                            </Link>
                        </div>
                        <div className="mt-6 flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                                <span className="hover:underline">
                                {blog.user?.name}
                                </span>
                            </p>
                            <div className="flex space-x-1 text-sm text-gray-500 ml-2">
                                <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            :
                <p>No blog item posted yet</p>    
            }
          </div>
        </div>
      </div>
    )
  }
  