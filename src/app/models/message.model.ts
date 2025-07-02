export interface Message {
  id?: string; // valfri, om du använder Firestore-id:n
  content: string;
  createdAt: Date;
  author?: string; // eller något annat relevant fält
}
