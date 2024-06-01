import Main from '@/components/containers/Main';
import FeaturedArticles from './FeaturedArticles';

export default function ArticlesPage() {
    return (
        <Main>
            <h1 className="text-center">Articles</h1>

            <FeaturedArticles />
        </Main>
    );
}
