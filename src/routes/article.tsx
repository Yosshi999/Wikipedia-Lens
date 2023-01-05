import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLatestRevision } from '../lib/wikipediaApi';
import { SingleTextViewer } from '../components/TextViewer';

type Page = {
  title: string;
  content: string;
  meta: {
    user: string;
    comment: string;
    sha1: string;
    timestamp: string;
  };
};

function Article() {
  const { title } = useParams();
  const [page, setPage] = useState<Page | null>(null);

  const openPage = async (title: string) => {
    const data: any = await getLatestRevision(title);
    const article = data.query.pages[0];
    const rev = article.revisions[0];
    const meta = {
      user: rev.user, comment: rev.comment, sha1: rev.sha1, timestamp: rev.timestamp
    };
    setPage({ title: article.title, content: rev.slots.main.content, meta });
  };

  useEffect(() => {
    if (title) openPage(title);
  }, [title]);

  return (
    <div>
      {(page === null) ? (
        <div>Loading {title}...</div>
      ) : (
        <div>
          <h2> {page.title} </h2>
          <SingleTextViewer
            content={page.content}
            {...page.meta}
          />
        </div>
      )}
    </div>
  );
}

export default Article;