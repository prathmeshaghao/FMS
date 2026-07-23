import companyRepository from "../repositories/company.repository";

class CompanyService {
  async getAllCompanies() {
    return companyRepository.getAll();
  }
  async createCompany(name: string) {
    const existing = await companyRepository.findByName(name);

    if (existing) {
      return existing;
    }

    return companyRepository.create(name);
  }
}

export default new CompanyService();
