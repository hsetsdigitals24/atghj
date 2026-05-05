import Image from 'next/image';
import orcidIcon from '../../public/images/ORCID_logo.svg.png';
import hero from '../../public/images/hero.jpg';

interface EditorialMember {
  name: string;
  role: string;
  affiliation: string;
  country: string;
  orcid?: string;
  profileImage?: string;
  bio?: string;
}

interface EditorialTeam {
  editorInChief: EditorialMember[];
  associateEditors: EditorialMember[];
  sectionEditors: EditorialMember[];
  editorialBoard: EditorialMember[];
  managingEditor: EditorialMember[];
  technicalEditor: EditorialMember[];
}

// This would typically come from your API
const editorialTeam: EditorialTeam = {
  editorInChief: [
    {
      name: "Prof. Adeoluwa",
      role: "Editor-in-Chief - Biomedical Sciences",
      affiliation: "Afe Babalola University",
      country: "Ekiti, Nigeria",
      orcid: "0000-xxxx-xxxx-xxxx",
      profileImage: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      bio: "Oversees journal operations Sets strategic vision and policies Approves final manuscript decisions. "
    }
  ],
  managingEditor: [
    {
      name: "Dr. K.S. Olaniyi",
      role: "Managing Editor",
      affiliation: "Afe Babalola University",
      country: "Ekiti, Nigeria",
      orcid: "0000-xxxx-xxxx-xxxx"
    }
  ],
  associateEditors: [
    {
      name: "Prof. Alagbonsi",
      role: "Associate Editor",
      affiliation: "Afe Babalola University",
      country: "Ekiti, Nigeria",
      orcid: "0000-xxxx-xxxx-xxxx"
    },
     {
      name: "Prof. Ogunmodede",
     role: "Associate Editor",
      affiliation: "Afe Babalola University",
      country: "Ekiti, Nigeria",
      orcid: "0000-xxxx-xxxx-xxxx"
    },
    {
      name: "Prof. Ekundina",
     role: "Associate Editor",
      affiliation: "Afe Babalola University",
      country: "Ekiti, Nigeria",
      orcid: "0000-xxxx-xxxx-xxxx"
    }
  ],
  sectionEditors: [
    {
      name: "Dr. John Okonjo",
      role: "Section Editor",
      affiliation: "University of Ibadan",
      country: "Nigeria",
      orcid: "0000-xxxx-xxxx-xxxx"
    }
  ],
  editorialBoard: [
  //   {
  //     name: "Prof. Marie Diop",
  //     role: "Editorial Board Member",
  //     affiliation: "University of Dakar",
  //     country: "Senegal",
  //     orcid: "0000-0002-5678-9012"
  //   }
  ], 
  technicalEditor: [
    {
      name: " Prof. L.A. Enye",
      role: "Technical Editor",
      affiliation: "ATGHJ Editorial Office",
      country: "Nigeria",
     orcid: "0000-xxxx-xxxx-xxxx"
    }
  ]
};

function EditorialMemberCard({ member }: { member: EditorialMember }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        {member.profileImage && (
          <div className="flex-shrink-0">
            <Image
              src={member.profileImage}
              alt={member.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <p className="text-indigo-600 font-medium">{member.role}</p>
          <p className="text-gray-600 mt-1">{member.affiliation}</p>
          <p className="text-gray-500 text-sm">{member.country}</p>
          {member.orcid && (
            <a
              href={`https://orcid.org/${member.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-sm text-gray-600 hover:text-indigo-600"
            >
              <Image
                src={orcidIcon}
                alt="ORCID"
                width={32}
                height={32}
                className="mr-1"
              />
              {member.orcid}
            </a>
          )}
          {member.bio && (
            <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function EditorialSection({ title, members }: { title: string; members: EditorialMember[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {members.map((member) => (
          <EditorialMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}

export default function MastheadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-primary to-accent">
        <Image
          src={hero}
          alt="Editorial Masthead"
          fill
          className="object-cover"
          priority
        />
        
       {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-accent/40"></div>
      
        {/* Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Editorial Masthead</h1>
            <p className="text-xl text-blue-100">
              Meet the team behind ATGHJ
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-600">
            The African Translational & Global Health Journal (ATGHJ) is supported by an 
            international editorial team of leading researchers and practitioners in 
            biomedical sciences, translational medicine, and global health. Our editorial 
            team ensures the highest standards of peer review and scientific publishing.
          </p>
        </div>

        {/* Editorial Sections */}
        <EditorialSection title="Editor-in-Chief" members={editorialTeam.editorInChief} />
        <EditorialSection title="Associate Editors" members={editorialTeam.associateEditors} />
        <EditorialSection title="Section Editors" members={editorialTeam.sectionEditors} />
        <EditorialSection title="Editorial Board" members={editorialTeam.editorialBoard} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <EditorialSection title="Managing Editor" members={editorialTeam.managingEditor} />
          <EditorialSection title="Technical Editor" members={editorialTeam.technicalEditor} />
        </div>

        {/* Join the Team CTA */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Editorial Team
          </h2>
          <p className="text-gray-600 mb-6">
            We welcome applications from qualified researchers and practitioners to join 
            our editorial board or serve as peer reviewers.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-accent transition-colors duration-200"
          >
            Express Interest
          </a>
        </div>
      </div>
    </div>
  );
}
