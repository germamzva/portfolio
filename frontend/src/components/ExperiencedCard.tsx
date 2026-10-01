import moment from 'moment';

interface ExperienceProps {
    experience: {
        _id: string;
        company: string;
        position: string;
        description?: string;
        total_from?: string;
        total_to?: string;
        total_year?: string;
    }
}

const ExperiencedCard = ({ experience }: ExperienceProps) => {
    return (
        <>
            <div className="mb-5">
                <p className=" text-fsize1 text-green-400 font-sora">
                    {experience.company}
                </p>
                <span className="text-white text-xs font-manrope">{moment(experience.total_from).format("MMMM YYYY")} - {moment(experience.total_to).format("MMMM YYYY")}</span>
            </div>

            <p className="text-white font-roboto text-fsize2 mb-1">
                Role: {experience.position}
            </p>

            <p className="text-white font-manrope text-fsize3 whitespace-pre-line">
                {experience.description}
            </p>
        </>
    );
}

export default ExperiencedCard;
