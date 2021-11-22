import http from "../http_common";

class UserService {
  create({ user, token, inviteId, redirect }) {
    http.post(
      `/users?token=${token}&inviteId=${inviteId}&redirect=${redirect}`,
      user
    );
  }
}
export default new UserService();
