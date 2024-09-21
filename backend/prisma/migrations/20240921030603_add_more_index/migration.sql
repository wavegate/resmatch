-- CreateIndex
CREATE INDEX "City_state_idx" ON "City"("state");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Dropped_programId_idx" ON "Dropped"("programId");

-- CreateIndex
CREATE INDEX "Dropped_userId_idx" ON "Dropped"("userId");

-- CreateIndex
CREATE INDEX "FameShame_programId_idx" ON "FameShame"("programId");

-- CreateIndex
CREATE INDEX "FameShame_userId_idx" ON "FameShame"("userId");

-- CreateIndex
CREATE INDEX "FellowshipMatch_programId_idx" ON "FellowshipMatch"("programId");

-- CreateIndex
CREATE INDEX "FellowshipMatch_userId_idx" ON "FellowshipMatch"("userId");

-- CreateIndex
CREATE INDEX "InterviewImpression_programId_idx" ON "InterviewImpression"("programId");

-- CreateIndex
CREATE INDEX "InterviewImpression_userId_idx" ON "InterviewImpression"("userId");

-- CreateIndex
CREATE INDEX "InterviewInvite_programId_idx" ON "InterviewInvite"("programId");

-- CreateIndex
CREATE INDEX "InterviewInvite_userId_idx" ON "InterviewInvite"("userId");

-- CreateIndex
CREATE INDEX "InterviewLogistics_programId_idx" ON "InterviewLogistics"("programId");

-- CreateIndex
CREATE INDEX "InterviewLogistics_userId_idx" ON "InterviewLogistics"("userId");

-- CreateIndex
CREATE INDEX "InterviewRejection_programId_idx" ON "InterviewRejection"("programId");

-- CreateIndex
CREATE INDEX "InterviewRejection_userId_idx" ON "InterviewRejection"("userId");

-- CreateIndex
CREATE INDEX "LOIResponse_programId_idx" ON "LOIResponse"("programId");

-- CreateIndex
CREATE INDEX "LOIResponse_userId_idx" ON "LOIResponse"("userId");

-- CreateIndex
CREATE INDEX "M4InternImpression_programId_idx" ON "M4InternImpression"("programId");

-- CreateIndex
CREATE INDEX "M4InternImpression_userId_idx" ON "M4InternImpression"("userId");

-- CreateIndex
CREATE INDEX "Malignant_programId_idx" ON "Malignant"("programId");

-- CreateIndex
CREATE INDEX "Malignant_userId_idx" ON "Malignant"("userId");

-- CreateIndex
CREATE INDEX "PostIVCommunication_programId_idx" ON "PostIVCommunication"("programId");

-- CreateIndex
CREATE INDEX "PostIVCommunication_userId_idx" ON "PostIVCommunication"("userId");

-- CreateIndex
CREATE INDEX "Question_programId_idx" ON "Question"("programId");

-- CreateIndex
CREATE INDEX "Question_userId_idx" ON "Question"("userId");

-- CreateIndex
CREATE INDEX "ScheduleDetails_programId_idx" ON "ScheduleDetails"("programId");

-- CreateIndex
CREATE INDEX "ScheduleDetails_userId_idx" ON "ScheduleDetails"("userId");

-- CreateIndex
CREATE INDEX "SecondLook_programId_idx" ON "SecondLook"("programId");

-- CreateIndex
CREATE INDEX "SecondLook_userId_idx" ON "SecondLook"("userId");

-- CreateIndex
CREATE INDEX "XorY_programXId_idx" ON "XorY"("programXId");

-- CreateIndex
CREATE INDEX "XorY_programYId_idx" ON "XorY"("programYId");

-- CreateIndex
CREATE INDEX "XorY_userId_idx" ON "XorY"("userId");
