-- CreateTable
CREATE TABLE "_upvotedXorY" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedInterviewInvites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedCityUserInputs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedFameShames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedRankLists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedPostIVCommunications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedScheduleDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedInterviewLogistics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedSecondLooks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedInterviewRejections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedM4InternImpressions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedMalignants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedLOIResponses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedInterviewImpressions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedDropped" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedFellowshipMatches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotedBinAssignments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedXorY_AB_unique" ON "_upvotedXorY"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedXorY_B_index" ON "_upvotedXorY"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedInterviewInvites_AB_unique" ON "_upvotedInterviewInvites"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedInterviewInvites_B_index" ON "_upvotedInterviewInvites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedCityUserInputs_AB_unique" ON "_upvotedCityUserInputs"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedCityUserInputs_B_index" ON "_upvotedCityUserInputs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedFameShames_AB_unique" ON "_upvotedFameShames"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedFameShames_B_index" ON "_upvotedFameShames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedComments_AB_unique" ON "_upvotedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedComments_B_index" ON "_upvotedComments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedRankLists_AB_unique" ON "_upvotedRankLists"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedRankLists_B_index" ON "_upvotedRankLists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedPostIVCommunications_AB_unique" ON "_upvotedPostIVCommunications"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedPostIVCommunications_B_index" ON "_upvotedPostIVCommunications"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedScheduleDetails_AB_unique" ON "_upvotedScheduleDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedScheduleDetails_B_index" ON "_upvotedScheduleDetails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedInterviewLogistics_AB_unique" ON "_upvotedInterviewLogistics"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedInterviewLogistics_B_index" ON "_upvotedInterviewLogistics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedSecondLooks_AB_unique" ON "_upvotedSecondLooks"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedSecondLooks_B_index" ON "_upvotedSecondLooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedInterviewRejections_AB_unique" ON "_upvotedInterviewRejections"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedInterviewRejections_B_index" ON "_upvotedInterviewRejections"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedM4InternImpressions_AB_unique" ON "_upvotedM4InternImpressions"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedM4InternImpressions_B_index" ON "_upvotedM4InternImpressions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedMalignants_AB_unique" ON "_upvotedMalignants"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedMalignants_B_index" ON "_upvotedMalignants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedLOIResponses_AB_unique" ON "_upvotedLOIResponses"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedLOIResponses_B_index" ON "_upvotedLOIResponses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedInterviewImpressions_AB_unique" ON "_upvotedInterviewImpressions"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedInterviewImpressions_B_index" ON "_upvotedInterviewImpressions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedQuestions_AB_unique" ON "_upvotedQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedQuestions_B_index" ON "_upvotedQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedDropped_AB_unique" ON "_upvotedDropped"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedDropped_B_index" ON "_upvotedDropped"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedFellowshipMatches_AB_unique" ON "_upvotedFellowshipMatches"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedFellowshipMatches_B_index" ON "_upvotedFellowshipMatches"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedBinAssignments_AB_unique" ON "_upvotedBinAssignments"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedBinAssignments_B_index" ON "_upvotedBinAssignments"("B");

-- AddForeignKey
ALTER TABLE "_upvotedXorY" ADD CONSTRAINT "_upvotedXorY_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedXorY" ADD CONSTRAINT "_upvotedXorY_B_fkey" FOREIGN KEY ("B") REFERENCES "XorY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewInvites" ADD CONSTRAINT "_upvotedInterviewInvites_A_fkey" FOREIGN KEY ("A") REFERENCES "InterviewInvite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewInvites" ADD CONSTRAINT "_upvotedInterviewInvites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedCityUserInputs" ADD CONSTRAINT "_upvotedCityUserInputs_A_fkey" FOREIGN KEY ("A") REFERENCES "CityUserInput"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedCityUserInputs" ADD CONSTRAINT "_upvotedCityUserInputs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedFameShames" ADD CONSTRAINT "_upvotedFameShames_A_fkey" FOREIGN KEY ("A") REFERENCES "FameShame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedFameShames" ADD CONSTRAINT "_upvotedFameShames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedComments" ADD CONSTRAINT "_upvotedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedComments" ADD CONSTRAINT "_upvotedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedRankLists" ADD CONSTRAINT "_upvotedRankLists_A_fkey" FOREIGN KEY ("A") REFERENCES "RankList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedRankLists" ADD CONSTRAINT "_upvotedRankLists_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedPostIVCommunications" ADD CONSTRAINT "_upvotedPostIVCommunications_A_fkey" FOREIGN KEY ("A") REFERENCES "PostIVCommunication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedPostIVCommunications" ADD CONSTRAINT "_upvotedPostIVCommunications_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedScheduleDetails" ADD CONSTRAINT "_upvotedScheduleDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduleDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedScheduleDetails" ADD CONSTRAINT "_upvotedScheduleDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewLogistics" ADD CONSTRAINT "_upvotedInterviewLogistics_A_fkey" FOREIGN KEY ("A") REFERENCES "InterviewLogistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewLogistics" ADD CONSTRAINT "_upvotedInterviewLogistics_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedSecondLooks" ADD CONSTRAINT "_upvotedSecondLooks_A_fkey" FOREIGN KEY ("A") REFERENCES "SecondLook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedSecondLooks" ADD CONSTRAINT "_upvotedSecondLooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewRejections" ADD CONSTRAINT "_upvotedInterviewRejections_A_fkey" FOREIGN KEY ("A") REFERENCES "InterviewRejection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewRejections" ADD CONSTRAINT "_upvotedInterviewRejections_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedM4InternImpressions" ADD CONSTRAINT "_upvotedM4InternImpressions_A_fkey" FOREIGN KEY ("A") REFERENCES "M4InternImpression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedM4InternImpressions" ADD CONSTRAINT "_upvotedM4InternImpressions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedMalignants" ADD CONSTRAINT "_upvotedMalignants_A_fkey" FOREIGN KEY ("A") REFERENCES "Malignant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedMalignants" ADD CONSTRAINT "_upvotedMalignants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedLOIResponses" ADD CONSTRAINT "_upvotedLOIResponses_A_fkey" FOREIGN KEY ("A") REFERENCES "LOIResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedLOIResponses" ADD CONSTRAINT "_upvotedLOIResponses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewImpressions" ADD CONSTRAINT "_upvotedInterviewImpressions_A_fkey" FOREIGN KEY ("A") REFERENCES "InterviewImpression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedInterviewImpressions" ADD CONSTRAINT "_upvotedInterviewImpressions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedQuestions" ADD CONSTRAINT "_upvotedQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedQuestions" ADD CONSTRAINT "_upvotedQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedDropped" ADD CONSTRAINT "_upvotedDropped_A_fkey" FOREIGN KEY ("A") REFERENCES "Dropped"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedDropped" ADD CONSTRAINT "_upvotedDropped_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedFellowshipMatches" ADD CONSTRAINT "_upvotedFellowshipMatches_A_fkey" FOREIGN KEY ("A") REFERENCES "FellowshipMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedFellowshipMatches" ADD CONSTRAINT "_upvotedFellowshipMatches_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedBinAssignments" ADD CONSTRAINT "_upvotedBinAssignments_A_fkey" FOREIGN KEY ("A") REFERENCES "BinAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedBinAssignments" ADD CONSTRAINT "_upvotedBinAssignments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
