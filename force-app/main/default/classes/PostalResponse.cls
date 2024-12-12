public class PostalResponse {

	public class PostOffice {
		public String Name;
		public String Description;
		public String BranchType;
		public String DeliveryStatus;
		public String Circle;
		public String District;
	}

	public String Message;
	public String Status;
	public List<PostOffice> PostOffice;

	
	public static PostalResponse parse(String json) {
		return (PostalResponse) System.JSON.deserialize(json, PostalResponse.class);
	}
}