import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";

import { createCourseSummary } from "../../lib/helpers";
import { i18n } from "../../../languages";
import Button from "../Button";
import Title from "../Title";
import Layout from "./Layout";

export default function Home({ data }) {
  const { courses, labels, legals } = data ?? {};
  const { locale, locales } = useRouter();
  const translations = locales.map((id) => ({
    language: id,
    path: id === i18n.base ? `/` : `/${id}`,
  }));
  const courseStart = labels?.length
    ? labels.find(({ key }) => key === "course.start")?.text
    : ``;

  return (
    <Layout translations={translations} legals={legals}>
      <div className="container mx-auto pt-header grid grid-cols-1 gap-header mt-header px-4 md:px-0">
        {courses?.length > 0 &&
          courses.map((course) => (
            <article
              key={course._id}
              className="relative bg-gradient-to-tr mix-blend-multiply from-cyan-100 via-pink-100 to-yellow-100 p-8 md:p-16 xl:p-24 rounded-xl md:rounded-2xl xl:rounded-3xl w-full flex flex-col gap-4 md:flex-row items-start md:items-center md:justify-between group hover:scale-[1.01] hover:rotate-[-0.25deg] transition-transform duration-200"
            >
              {course?.slug?.[locale].current ? (
                <>
                  <Link
                    href={course.slug[locale].current}
                    className="block absolute inset-0 z-10"
                  >
                    <span className="sr-only">{course.title[locale]}</span>
                  </Link>
                  <Title
                    subtitle={createCourseSummary(
                      course.lessons,
                      course.presenters,
                      labels
                    )}
                  >
                    {course.title[locale]}
                  </Title>
                  <Button
                    Icon={ArrowRightIcon}
                    href={course.slug[locale].current}
                  >
                    {courseStart}
                  </Button>
                </>
              ) : (
                <Title
                  subtitle={createCourseSummary(
                    course.lessons,
                    course.presenters,
                    labels
                  )}
                >
                  {course.title[locale]}
                </Title>
              )}
            </article>
          ))}
      </div>
    </Layout>
  );
}
