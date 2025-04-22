import http from "../instance";

import type { AcademyListItem, CreateAcademyInput, AcademyDetail } from "../../type/academy";

// API 엔드포인트
const ACADEMY_API = {
  BASE: "/academies",
};

// API 함수들
export const academyApi = {

  // 학원 목록 조회
  getList: async (): Promise<AcademyListItem[]> => {
    return await http.get<AcademyListItem[]>({
      url: ACADEMY_API.BASE,
    });
  },

  // 학원 상세 조회
  getDetail: async (academyId: number): Promise<AcademyDetail> => {
    return await http.get<AcademyDetail>({
      url: `${ACADEMY_API.BASE}/${academyId}/by-admin`,
    });
  },

  // 학원 생성
  createAcademy: async (data: CreateAcademyInput): Promise<void> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("nameEn", data.nameEn);
    formData.append("representativeName", data.representativeName);
    formData.append("representativeEmail", data.representativeEmail);
    formData.append("description", data.description ?? "");
    formData.append("locationType", data.locationType);
    formData.append("detailedAddress", data.detailedAddress);
    formData.append("lat", data.lat.toString());
    formData.append("lng", data.lng.toString());
    formData.append("forKindergarten", String(data.forKindergarten));
    formData.append("forElementary", String(data.forElementary));
    formData.append("forMiddleSchool", String(data.forMiddleSchool));
    formData.append("forHighSchool", String(data.forHighSchool));
    formData.append("forAdult", String(data.forAdult));

    // 이미지 여러 개일 경우 처리
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image: File) => {
        formData.append("images", image);
      });
    }
    try {
      return await http.postMultipart<void>({
        url: ACADEMY_API.BASE,
        data: formData
      });
    } catch (error) {
      console.error("Error creating academy:", error);
      throw new Error("Failed to create academy");
    }
  },

  updateAcademy: async (academyId: number, data: CreateAcademyInput): Promise<void> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("nameEn", data.nameEn);
    formData.append("representativeName", data.representativeName);
    formData.append("representativeEmail", data.representativeEmail);
    formData.append("description", data.description ?? "");
    formData.append("locationType", data.locationType);
    formData.append("detailedAddress", data.detailedAddress);
    formData.append("lat", data.lat.toString());
    formData.append("lng", data.lng.toString());
    formData.append("forKindergarten", String(data.forKindergarten));
    formData.append("forElementary", String(data.forElementary));
    formData.append("forMiddleSchool", String(data.forMiddleSchool));
    formData.append("forHighSchool", String(data.forHighSchool));
    formData.append("forAdult", String(data.forAdult));

    // 이미지 여러 개일 경우 처리
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image: File) => {
        formData.append("images", image);
      });
    }
    try {
      return await http.putMultipart<void>({
        url: `${ACADEMY_API.BASE}/${academyId}`,
        data: formData
      });
    } catch (error) {
      console.error("Error updating academy:", error);
      throw new Error("Failed to update academy");
    }
  },
};