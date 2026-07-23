import genderRepository from "../repositories/gender.repository";

class GenderService {
  async getAllGenders() {
    return genderRepository.findAll();
  }
}

export default new GenderService();
