import { css, StyleSheet } from "aphrodite";
import { BountyContributionItem, CommentContributionItem, Contribution, RscSupportContributionItem } from "~/config/types/contribution";
import SubmissionDetails from "~/components/Document/SubmissionDetails";
import ContributionAuthor from "./ContributionAuthor";
import { ReactNode } from "react";
import ContentBadge from "~/components/ContentBadge";
import ALink from "~/components/ALink";
import { getUrlToUniDoc } from "~/config/utils/routing";
import { POST_TYPES } from "~/components/TextEditor/config/postTypes";
import colors from "~/config/themes/colors";
import ResearchCoinIcon from "~/components/Icons/ResearchCoinIcon";

type Args = {
  entry: Contribution;
}

const ContributionHeader = ({ entry }: Args) => {
  const { contentType } = entry;
  let { item, hubs } = entry;
  const { createdBy, createdDate } = item;

  let contentBadgeLabel: ReactNode | string;
  let actionLabel = <>posted in</>;

  if (contentType.name === "bounty") {
    item = item as BountyContributionItem;
    actionLabel = 
      <>
        created <ResearchCoinIcon overrideStyle={styles.rscIcon} version={4} width={16} height={16} /><span className={css(styles.rsc)}>{` `}{item.amount} RSC</span> bounty in
      </>
    contentBadgeLabel = item.amount + " Bounty"
  }
  else if (contentType.name === "rsc_support") {
    item = item as RscSupportContributionItem;
    contentBadgeLabel = item.amount + " Supported";      
    if (item.source.contentType.name === "comment") {
      actionLabel = 
        <>
          supported <ContributionAuthor authorProfile={item.recipient?.authorProfile} />{` `}
          <ResearchCoinIcon overrideStyle={styles.rscIcon} version={4} width={16} height={16} /><span className={css(styles.rsc)}>{` `}{item.amount} RSC</span> for their comment
        </>
    }
    else {
      actionLabel = 
        <>
          supported authors{` `}
          <ResearchCoinIcon overrideStyle={styles.rscIcon} version={4} width={16} height={16} /><span className={css(styles.rsc)}>{` `}{item.amount} RSC</span> for their {item.source?.contentType.name}
        </>
    }
  }
  else if (contentType.name === "comment") {
    item = item as CommentContributionItem;
    hubs = [];
    let action = "commented on"
    if (item.postType === POST_TYPES.ANSWER) {
      action = "submitted answer for";
    }
    else if (item.postType === POST_TYPES.SUMMARY) {
      action = "submitted summary for";
    }
    else if (item.postType === POST_TYPES.REVIEW) {
      action = "submitted review for";
    }    

    actionLabel = 
      <>
        {action} <ALink overrideStyle={styles.link} href={getUrlToUniDoc(item.unifiedDocument)}>{item.unifiedDocument?.document?.title}</ALink>
      </>
  }

  // @ts-ignore
  const contentTypeForBadge = entry.contentType.name === "comment" ? entry.item.postType || POST_TYPES.DISCUSSION : entry.contentType.name;
  return (
    <div className={css(styles.header)}>
      <SubmissionDetails
        createdBy={createdBy}
        hubs={hubs}
        createdDate={createdDate}
        avatarSize={25}
        actionLabel={actionLabel}
      />
      <div className={`${css(styles.contentBadge)}`}>
        {/* @ts-ignore */}
        <ContentBadge label={contentBadgeLabel} contentType={contentTypeForBadge} />
      </div>
    </div>
  )
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },  
  contentBadge: {
    marginLeft: "auto",
    opacity: 1,
    display: "flex",
  },  
  link: {
    fontWeight: 400,
  },
  rsc: {
    color: colors.ORANGE_DARK2()
  },
  rscIcon: {
    verticalAlign: "text-top",
  }
});

export default ContributionHeader;