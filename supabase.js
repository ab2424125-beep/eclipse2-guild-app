// ==========================================
// [ECLIPSE Guild Management System]
// Supabase REST API 통신 공통 모듈 (supabase.js)
// ==========================================

const SUPABASE_CONFIG = {
  url: "https://vwmfehfmtzyvronvdxvt.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bWZlaGZtdHp5dnJvbnZkeHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MTgwODIsImV4cCI6MjEwNzE5NDA4Mn0.-C6FfESuRVsERAymSTJf7i8FPMYYE7eMKIhvJadyjkQ"
};

/**
 * Supabase REST API 직접 호출 공통 함수
 * @param {string} endpoint - 테이블명 및 쿼리 파라미터 (예: 'guild_members?select=*')
 * @param {string} method - GET, POST, PATCH, DELETE
 * @param {object|array|null} body - 전송할 JSON 데이터
 * @param {object} extraHeaders - 추가 HTTP 헤더
 */
async function apiRequest(endpoint, method = "GET", body = null, extraHeaders = {}) {
  const url = `${SUPABASE_CONFIG.url}/rest/v1/${endpoint}`;
  const headers = {
    "apikey": SUPABASE_CONFIG.anonKey,
    "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation",
    ...extraHeaders
  };

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}`);
  }
  
  // 204 No Content 등 본문이 없는 응답 방어
  if (res.status === 204) return null;
  return await res.json();
}
