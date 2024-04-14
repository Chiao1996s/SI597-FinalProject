on: [create]
name: Setup Assignment

jobs:
  student_setup:
    runs-on: ubuntu-latest
    name: Student Assignment Setup
    steps:
      - uses: actions/checkout@v4
      - name: Check if student
        id: check
        uses: bbenjamin/classroom-create/@main
      - name: Process Student
        if: steps.check.outputs.is-student == '1'
        run: git fetch origin;  git branch -r | grep origin/ | grep -v 'main\|feedback' | grep -v HEAD| cut -d/ -f2 | while read line; do git push origin :$line; done;