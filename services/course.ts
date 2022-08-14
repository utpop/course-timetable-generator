import { Course, CourseSearching, UniversityStorage } from '@/types'
import { matchSorter } from 'match-sorter'
import { Univerisity } from '@/enums'

const storage: UniversityStorage = {
  'HCMIU - International Univerisity': null,
  'UEH - University of Economics HCMC': null,
}

export async function loadUniversity(university: Univerisity) {
  if (storage[university] === null) {
    try {
      storage[university] = await import(`@/data/${university}.json`)
    } catch {
      storage[university] = {
        faculties: {},
        courses: {},
      }
    }
  }
}

export function getUniversities() {
  return Object.values(Univerisity)
}

export async function getUniversityUpdatedTime(university: Univerisity) {
  await loadUniversity(university)

  return storage[university]?.updatedAt
}

export async function getFaculties(university: Univerisity) {
  await loadUniversity(university)

  return ['', ...Object.keys(storage[university]?.faculties || {})]
}

export async function getLecturersOfCourse(university: Univerisity, courseName: string) {
  await loadUniversity(university)

  return storage[university]?.courses[courseName].lecturers || []
}

export async function getCourseNames(university: Univerisity, faculty = '') {
  await loadUniversity(university)

  return faculty === ''
    ? Object.keys(storage[university]?.courses || {})
    : Object.keys(storage[university]?.faculties[faculty].courses || {})
}

export async function getCourseGroups(university: Univerisity, courseNames: string[]) {
  await loadUniversity(university)

  return courseNames.map((name) => Object.values(storage[university]?.courses[name]?.items || []))
}

export async function searchCoursesByName(searching: CourseSearching) {
  await loadUniversity(searching.university)

  const courseNames =
    searching.faculty === undefined || searching.faculty === ''
      ? Object.keys(storage[searching.university]?.courses || {})
      : Object.keys(storage[searching.university]?.faculties[searching.faculty]?.courses || {})

  const filteredCourseNames =
    searching.keyword === '' ? courseNames : matchSorter(courseNames, searching.keyword)
  const filteredCourses: Course[] = []

  for (const courseName of filteredCourseNames) {
    filteredCourses.push(...(storage[searching.university]?.courses[courseName].items || []))
  }

  return filteredCourses
}
