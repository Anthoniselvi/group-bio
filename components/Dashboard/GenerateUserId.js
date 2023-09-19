import Profile from "../../models/ProfileSchema";

export async function generateUserId() {
  try {
    const lastProfile = await Profile.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    if (lastProfile && lastProfile.userId) {
      const lastUserId = lastProfile.userId;
      const lastNumber = parseInt(lastUserId.split("-")[1]);
      return `UI-${lastNumber + 1}`;
    } else {
      return "UI-1";
    }
  } catch (error) {
    console.error("Error generating user ID:", error);
    throw error;
  }
}
