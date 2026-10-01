import { Page, Text, View, Document, StyleSheet, Svg, Path, Link } from '@react-pdf/renderer';
import { createTw } from '@react-pdf/tailwind';
import moment from 'moment';

// react pdf styles reset
const tw = createTw({
    colors: {
        custom1: "#22c55e"
    }
});
const styles = StyleSheet.create({
    header: {
        fontSize: "30px"
    },
    subHeader: {
        fontSize: "20px"
    },
    subHeader1: {
        fontSize: "18px"
    },
    subHeader2: {
        fontSize: "16px"
    },
    subHeader3: {
        fontSize: "14px"
    },
    subHeader4: {
        fontSize: "12px"
    },
    textSmall: {
        fontSize: "10px"
    },
    color: {
        color: "#22c55e"
    },
    border: {
        borderLeftWidth: 5,
        borderLeftColor: "#22c55e"
    }
});


/**
 * Props for the PDFDocument component
 * @interface PDFDocumentProps
 */
interface PDFDocumentProps {
    user: any | undefined;
    resume: any | undefined;
}

/**
 * Skill types for categorizing skills
 * @enum {string}
 */
enum SkillType {
    frontend = "frontend",
    backend = "backend",
    cms = "cms",
    others = "others",
}

// remove html tags
const stripHtml = (html?: string) => {
    if (!html) return "";

    const doc = new DOMParser().parseFromString(html, "text/html");

    return (doc.body.textContent || "")
        .replace(/\u00A0/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
};

const PDFDocument = ({ user, resume }: PDFDocumentProps) => {

    return (
        <>
            <Document>
                <Page size="A4" style={tw('p-10 font-roboto')}>

                    {/* header */}
                    <View style={tw('flex flex-row justify-start')}>
                        <View style={tw('w-3/5 flex flex-col justify-center')}>
                            <Text style={[styles.header, tw('font-bold capitalize')]}>{resume?.resumeInfo?.personalInfo?.[0]?.fullname ?? ""}</Text>
                            <Text style={[tw('text-sm'), styles.color, styles.subHeader3]}>{resume?.resumeInfo?.personalInfo?.[0]?.position ?? ""}</Text>
                        </View>
                        <View style={([styles.border, tw('w-2/5 border-l pl-2')])}>
                            <Text style={tw('text-xs mb-1')}>{resume?.resumeInfo?.personalInfo?.[0]?.address || "Tagum City, Davao del Norte, Philippines"}</Text>
                            <Text style={tw('text-xs mb-1')}>{resume?.resumeInfo?.personalInfo?.[0]?.email || "geramalfeche@gmail.com"}</Text>
                            <Text style={tw('text-xs mb-2')}><Link href={`tel:${resume?.resumeInfo?.personalInfo?.[0]?.phone || "0000 0000"}`} style={tw('text-black no-underline')}>{resume?.resumeInfo?.personalInfo?.[0]?.phone || "+63 912 345 6789"}</Link></Text>
                            <View style={tw('flex flex-row')}>
                                {resume?.resumeInfo?.personalInfo?.[0]?.links?.map((link: any) => (
                                    <>
                                        {link.name === "LinkedIn" ? (
                                            <Link href={link.link} style={tw('text-black no-underline')}>
                                                <Svg viewBox="0 0 640 640" width={16} height={16}>
                                                    <Path style={{ fill: '#000000' }} d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z" />
                                                </Svg>
                                            </Link>
                                        ) : ""}
                                        {link.name === "Facebook" ? (
                                            <Link href={link.link} style={tw('text-black no-underline')}>
                                                <Svg viewBox="0 0 640 640" width={16} height={16}>
                                                    <Path style={{ fill: '#000000' }} d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
                                                </Svg>
                                            </Link>
                                        ) : ""}
                                    </>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* professional summary */}
                    <View style={tw('border-b border-black pt-5')}>
                        <Text style={[styles.subHeader2, tw('font-bold')]}>{`Professional Summary`}</Text>
                    </View>

                    <Text style={tw('text-sm pt-2')}>
                        {stripHtml(resume?.resumeInfo?.personalInfo?.[0]?.about_summary) || "Your sample summary text here"}
                    </Text>

                    {/* work experience */}
                    <View style={tw('border-b border-black pt-5')}>
                        <Text style={[styles.subHeader2, tw('font-bold')]}>Work Experience</Text>
                    </View>

                    {resume?.resumeInfo?.experiences?.map((experience: any) => (
                        <View style={tw('flex flex-col text-sm pt-3 pb-3 border-b border-black/10')} key={experience._id}>
                            <View style={tw('flex flex-row justify-between pb-3')}>
                                <Text style={[styles.subHeader4, tw('font-bold')]}>{experience.position}</Text>
                                <Text style={[styles.color, tw('text-xs')]}>{moment(experience.total_from).format("MMMM YYYY")} - {moment(experience.total_to).format("MMMM YYYY")}</Text>
                            </View>
                            <Text style={tw('text-sm pb-2')}>{experience.company}</Text>
                            <Text style={tw('text-xs pb-2')}>Roles:</Text>
                            <View style={tw('flex flex-col gap-1')}>
                                <Text style={tw('text-xs whitespace-pre-line')}>{experience.description}</Text>
                            </View>
                        </View>
                    ))}

                    {/* technical skills */}
                    <View style={tw('border-b border-black pt-5')}>
                        <Text style={[styles.subHeader2, tw('font-bold')]}>Technical Skills</Text>
                    </View>

                    {Object.values(SkillType).map((type) => {
                        const filteredSkills = resume?.resumeInfo?.skills?.filter(
                            (skill: any) => skill.skill_type === type
                        );

                        // Don't render this skill type if it has no skills
                        if (!filteredSkills?.length) {
                            return null;
                        }

                        return (
                            <View key={type} style={tw('pt-3 pb-1')}>
                                <Text style={tw('text-sm font-bold capitalize')}>{type}</Text>
                                <View style={tw('flex flex-row gap-1')}>
                                    {filteredSkills.map((skill: any) => (
                                        <Text style={tw('text-xs border border-black/10 px-1 py-1')} key={skill._id}>{skill.skills}</Text>
                                    ))}
                                </View>
                            </View>
                        );
                    })}

                    {/* portfolios */}
                    <View style={tw('border-b border-black pt-5')}>
                        <Text style={[styles.subHeader2, tw('font-bold')]}>Selected Projects</Text>
                    </View>
                    {resume?.resumeInfo?.projects?.map((project: any) => (
                        <View style={tw('flex flex-col text-sm py-3 border-b border-black/10')} key={project._id}>
                            <View style={tw('flex flex-row justify-between pb-3')}>
                                <Text style={[styles.subHeader4, tw('font-bold')]}>{project.name}</Text>
                            </View>
                            <Text style={tw('text-xs pb-2 font-bold')}>Description:</Text>
                            <Text style={tw('text-xs pb-2 whitespace-pre-line')}>{project.description}</Text>
                            <Text style={tw('text-xs pb-2 font-bold')}>Tools:</Text>
                            <View style={tw('flex flex-col gap-1')}>
                                <Text style={[styles.textSmall, tw('text-xs whitespace-pre-line')]}>{project.tools}</Text>
                            </View>
                            {project.link && (
                                <Text style={[styles.color, tw('text-xs pt-2')]}>{project.link}</Text>
                            )}
                        </View>
                    ))}

                    {/* education */}
                    <View style={tw('border-b border-black pt-5')}>
                        <Text style={[styles.subHeader2, tw('font-bold')]}>Education</Text>
                    </View>

                    {resume?.resumeInfo?.educations?.map((education: any) => (
                        <View style={tw('flex flex-col text-sm pt-2')} key={education._id}>
                            <View style={tw('flex flex-row justify-between pb-3')}>
                                <Text style={[styles.subHeader4, tw('font-bold')]}>{education.school_name}</Text>
                                <Text style={[styles.color, tw('text-xs')]}>{moment(education.start_year).format("MMMM YYYY")} - {moment(education.end_year).format("MMMM YYYY")}</Text>
                            </View>
                            <Text style={tw('text-sm pb-2')}>{education.course}</Text>
                        </View>
                    ))}
                </Page>
            </Document>
        </>
    );
}

export default PDFDocument;
