import { CancelCircleDuotoneStandard } from '@hugeicons-pro/core-duotone-standard';
import type { UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import Column from 'shared/ui/Column';
import { EmptyView } from 'shared/ui/Empty';
import { LoadingSpinner } from 'shared/ui/LoadingSpinner';
import { ScreenContent } from 'shared/ui/ScreenContent';

type Props = {
  queries: Array<UseQueryResult>;
  errorTitle?: string;
  errorSubtitle?: string;
  renderSkeleton?: () => React.ReactNode;
};

export const QueryGuard = ({ queries, errorTitle, errorSubtitle, renderSkeleton }: Props) => {
  const { t } = useTranslation();
  const hasFetchingQueries = queries.some((query) => query.isFetching);
  const hasQueryErrors = queries.some((query) => query.isError);

  if (hasFetchingQueries) {
    return renderSkeleton ? (
      renderSkeleton()
    ) : (
      <ScreenContent>
        <Column justify='center' align='center' style={styles.container}>
          <LoadingSpinner />
        </Column>
      </ScreenContent>
    );
  }

  if (hasQueryErrors) {
    return (
      <ScreenContent>
        <Column justify='center' align='center' style={styles.container}>
          <EmptyView
            icon={CancelCircleDuotoneStandard}
            text={errorTitle ?? t('shared.error')}
            subtext={errorSubtitle}
          />
        </Column>
      </ScreenContent>
    );
  }

  return (
    <ScreenContent>
      <Column justify='center' align='center' style={styles.container}>
        <EmptyView icon={CancelCircleDuotoneStandard} text={t('shared.error')} />
      </Column>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
