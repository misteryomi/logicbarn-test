import { formatDate } from "@/Utils/helpers";

export default function Comments({comments}) {
    return (
        <div className="mb-4">
          <h3 className="font-semibold text-xl text-gray-800 leading-tight mb-2">Recent Comments</h3>

            <div className="flow-root mt-6">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                { comments.length > 0 ?
                    comments.map((comment, index) => (
                        <li key={index} className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                            <h3 className="text-sm font-semibold text-gray-500">
                            <span href="#" className=" focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                By {comment.guest_name} ({comment.guest_email}) - {formatDate(comment.created_at)}
                            </span>
                            </h3>
                            <div className="mt-1 text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
                        </div>
                        </li>
                    ))
                :
                    <p className="text-sm text-gray-500">No comment added yet.</p>
                }
                </ul>
            </div>
        </div>
    )
}
  