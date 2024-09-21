-- DropIndex
DROP INDEX "InterviewInvite_programId_idx";

-- CreateIndex
CREATE INDEX "Comment_userId_parentId_idx" ON "Comment"("userId", "parentId");

-- CreateIndex
CREATE INDEX "Dropped_programId_userId_idx" ON "Dropped"("programId", "userId");

-- CreateIndex
CREATE INDEX "FameShame_programId_userId_idx" ON "FameShame"("programId", "userId");

-- CreateIndex
CREATE INDEX "FellowshipMatch_programId_userId_idx" ON "FellowshipMatch"("programId", "userId");

-- CreateIndex
CREATE INDEX "InterviewImpression_programId_userId_idx" ON "InterviewImpression"("programId", "userId");

-- CreateIndex
CREATE INDEX "InterviewInvite_programId_userId_idx" ON "InterviewInvite"("programId", "userId");

-- CreateIndex
CREATE INDEX "InterviewLogistics_programId_userId_idx" ON "InterviewLogistics"("programId", "userId");

-- CreateIndex
CREATE INDEX "InterviewRejection_programId_userId_idx" ON "InterviewRejection"("programId", "userId");

-- CreateIndex
CREATE INDEX "LOIResponse_programId_userId_idx" ON "LOIResponse"("programId", "userId");

-- CreateIndex
CREATE INDEX "M4InternImpression_programId_userId_idx" ON "M4InternImpression"("programId", "userId");

-- CreateIndex
CREATE INDEX "Malignant_programId_userId_idx" ON "Malignant"("programId", "userId");

-- CreateIndex
CREATE INDEX "PostIVCommunication_programId_userId_idx" ON "PostIVCommunication"("programId", "userId");

-- CreateIndex
CREATE INDEX "Program_cityId_idx" ON "Program"("cityId");

-- CreateIndex
CREATE INDEX "Question_programId_userId_idx" ON "Question"("programId", "userId");

-- CreateIndex
CREATE INDEX "RankList_userId_idx" ON "RankList"("userId");

-- CreateIndex
CREATE INDEX "ScheduleDetails_programId_userId_idx" ON "ScheduleDetails"("programId", "userId");

-- CreateIndex
CREATE INDEX "SecondLook_programId_userId_idx" ON "SecondLook"("programId", "userId");

-- CreateIndex
CREATE INDEX "XorY_programXId_programYId_userId_idx" ON "XorY"("programXId", "programYId", "userId");
