import Image from 'next/image';
import Link from 'next/link';
import { LatestIssueProps as IssueType } from '@/app/api/journal/types';

interface LatestIssueComponentProps {
    issue: IssueType;
}

export default function LatestIssue({ issue }: LatestIssueComponentProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cover Image */}
                <div className="relative aspect-[3/4] max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
                    {issue.coverImageUrl?.en && (
                        <Image
                            src={issue.coverImageUrl.en}
                            alt={issue.coverImageAltText?.en || 'Issue cover'}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>

                {/* Issue Details */}
                <div className="mt-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">{issue.title.en}</h2>
                    <p className="mt-2 text-lg text-gray-600">{issue.identification}</p>
                    
                    {/* Articles List */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-6">Articles in this Issue</h3>
                        <div className="space-y-6">
                            {issue.articles.map((article) => (
                                <article key={article.id} className="max-w-2xl mx-auto">
                                    <h4 className="text-lg font-medium">
                                        <Link 
                                            href={article.urlPublished}
                                            className="hover:text-indigo-600 transition-colors"
                                        >
                                            {/* {article.title.en} */}
                                        </Link>
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {article.authorsString}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}