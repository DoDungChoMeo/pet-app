const url = `https://provinces.open-api.vn`;

async function fetchProvinces() {
  const res = await fetch(url + `/api/p/`);
  const data = await res.json();
  return data;
}

async function fetchDistricts(provinceCode) {
  const res = await fetch(url + `/api/p/${provinceCode}?depth=2`);
  const data = await res.json();
  return data;
}

async function fetchWards(districtCode) {
  const res = await fetch(url + `/api/d/${districtCode}?depth=2`);
  const data = await res.json();
  return data;
}

export { fetchProvinces, fetchDistricts, fetchWards };
