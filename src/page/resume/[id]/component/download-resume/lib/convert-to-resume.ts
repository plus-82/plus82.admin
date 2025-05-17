import { JobPostRelationDetail, Resume } from '@/type/resume'

export const convertToResume = (
  resumeRelation: JobPostRelationDetail,
): Resume => {
  return {
    id: resumeRelation.id,
    title: resumeRelation.resumeTitle,
    personalIntroduction: resumeRelation.personalIntroduction,
    firstName: resumeRelation.firstName,
    lastName: resumeRelation.lastName,
    email: resumeRelation.email,
    degree: resumeRelation.degree,
    major: resumeRelation.major,
    genderType: resumeRelation.genderType,
    birthDate: resumeRelation.birthDate,
    hasVisa: resumeRelation.hasVisa,
    visaType: resumeRelation.visaType,
    forKindergarten: resumeRelation.forKindergarten,
    forElementary: resumeRelation.forElementary,
    forMiddleSchool: resumeRelation.forMiddleSchool,
    forHighSchool: resumeRelation.forHighSchool,
    forAdult: resumeRelation.forAdult,
    countryId: resumeRelation.countryId,
    countryNameEn: resumeRelation.countryNameEn,
    residenceCountryId: resumeRelation.residenceCountryId,
    residenceCountryNameEn: resumeRelation.residenceCountryNameEn,
    profileImagePath: resumeRelation.profileImagePath,
    filePath: resumeRelation.filePath,
    fileName: resumeRelation.fileName,
    isRepresentative: false,
    createdAt: '',
    updatedAt: '',
  }
}
