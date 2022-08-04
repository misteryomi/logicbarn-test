import BlogItem from '@/Components/BlogItem';
import NavBar from '@/Components/NavBar';
import Comments from '../Comments/List';
import Comment from '../Comments/New';

export default function Show(props) {
  const { blog, comments } = props;
  
  return (
    <>
        <NavBar />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="p-2">
                    <BlogItem blog={blog} />

                    <div className="w-4/6 mx-auto">
                        <Comments comments={comments}/>
                        <hr className="my-5"/>
                        <Comment blog={blog}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
