# Microsoft MakeCode – Tool zur Code-Auswertung

## Häufig gestellte Fragen zum verantwortungsvollen Umgang mit KI

### 1. Was ist das MakeCode-Code-Auswertungstool?

Das MakeCode-Tool zur Code-Auswertung ist ein Online-Tool für Lehrkräfte, das dabei hilft, die blockbasierten Programmierprogramme von SchülerInnen zu verstehen und zu bewerten. Zusätzlich zu den Funktionen zur statischen Analyse gibt es eine optionale KI-Komponente, mit der Lehrkräfte den Schülerinnen und Schülern zusätzliches Feedback und Empfehlungen geben können. Die Lehrkraft kann jeweils konkrete Fragen zu einem Projekt stellen (z. B. „Haben die Variablen in diesem Programm aussagekräftige Namen?“), woraufhin die KI eine Antwort samt Begründung liefert.

### 2. Was kann das MakeCode-Code-Evaluierungstool?

Das MakeCode-Tool zur Code-Auswertung sendet den aktuellen Code der Schülerinnen und Schüler zusammen mit der Frage dee Lehrkraft sowie einigen kontextbezogenen Informationen an DeepPrompt (einen LLM-Dienst von Microsoft Azure) und gibt die daraus resultierende KI-Antwort an die Nutzenden zurück.

### 3. Wozu ist das MakeCode-Code-Auswertungstool gedacht?

Das MakeCode-Tool zur Code-Auswertung soll Lehrkräften dabei helfen, die Rückmeldung zu den Programmen ihrer Schüler zu beschleunigen.

### 4. Wie wurde das MakeCode-Code-Evaluierungstool bewertet? Anhand welcher Kennzahlen wird die Leistung gemessen?

Das System wurde anhand von über 1000 Eingabeaufforderungen aus verschiedenen Quellen evaluiert, um sicherzustellen, dass die Antworten fundiert und für die Aufgabe der Lehrkraft, den Code der Schülerinnen und Schüler zu bewerten, relevant sind. Wir haben die Genauigkeit mithilfe von Red-Teaming-Tests und einer Überprüfung der Antworten durch Experten und Expertinnen bewertet.

### 5. Welche Einschränkungen gibt es beim MakeCode-Code-Evaluierungstool? Wie kann man die Auswirkungen der Einschränkungen des Codebewertungswerkzeugs bei der Verwendung des Systems minimieren?

Das System unterstützt ausschließlich Bildungsszenarien im Zusammenhang mit dem eingegebenen Code. In anderen Szenarien oder bei nicht damit zusammenhängenden Fragen wird das System keine guten Ergebnisse liefern. Bei der Verwendung dieses Tools sollten Lehrkräfte kurze, prägnante Fragen stellen, die sich auf die Bewertung des von den Schülerinnen und Schülern geschriebenen Codes beziehen. Pro Programm sind maximal 5 Fragen zulässig, wobei jede Frage höchstens 1000 Zeichen umfassen darf. Das MakeCode-Tool zur Code-Bewertung kann keine direkten Punktzahlen oder Noten für die Arbeiten der Schülerinnen und Schüler vergeben.

### ~reminder

#### Beta

Dieses Tool befindet sich derzeit in der Beta-Phase, und wir freuen uns über Feedback. Bitte klicke auf die Schaltfläche **Feedback**, um uns Erfahrungen und Gedanken zum MakeCode-Code-Evaluierungstool mitzuteilen.

### ~