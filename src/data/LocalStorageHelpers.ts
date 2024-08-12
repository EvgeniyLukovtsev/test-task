export function saveQuestionAnswer({ id, type, answer }) {
  localStorage.setItem("question-" + id, JSON.stringify({ type, answer }));
}

export function getQuestionAnswer(id: string | number) {
  const answer = localStorage.getItem("question-" + id);
  return answer ? JSON.parse(answer) : null;
}
