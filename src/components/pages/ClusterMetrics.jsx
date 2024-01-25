import React from 'react';

function ClusterMetrics() {
  // charts to add: 
//   UnderReplicatedPartitions	The number of under-replicated partitions across all topics on the broker. Under-replicated partition metrics are a leading indicator of one or more brokers being unavailable.
// IsrShrinksPerSec/IsrExpandsPerSec	If a broker goes down, in-sync replica ISRs for some of the partitions shrink. When that broker is up again, ISRs are expanded once the replicas are fully caught up.
// ActiveControllerCount	Indicates whether the broker is active and should always be equal to 1 since there is only one broker at the same time that acts as a controller.
// OfflinePartitionsCount	The number of partitions that don’t have an active leader and are hence not writable or readable. A non-zero value indicates that brokers are not available.
// LeaderElectionRateAndTimeMs	A partition leader election happens when ZooKeeper is not able to connect with the leader. This metric may indicate a broker is unavailable.
// UncleanLeaderElectionsPerSec	A leader may be chosen from out-of-sync replicas if the broker which is the leader of the partition is unavailable and a new leader needs to be elected. This metric can indicate potential message loss.
// TotalTimeMs	The time is taken to process the message.
// PurgatorySize	The size of purgatory requests. Can help identify the main causes of the delay.
// BytesInPerSec/BytesOutPerSec	The number of data brokers received from producers and the number that consumers read from brokers. This is an indicator of the overall throughput or workload in the Kafka cluster.
// RequestsPerSecond	Frequency of requests from producers, consumers, and subscribers.

// Page cache reads ratio	The ratio of the number of reads from the cache pages and the number of reads from the disk.
// Disk usage	The amount of used and available disk space.
// CPU usage	The CPU is rarely the source of performance issues. However, if you see spikes in CPU usage, this metric should be investigated.
// Network bytes sent/received	The amount of incoming and outgoing network traffic.

  return (
    <div>
      <h1>Cluster Metrics</h1>
    </div>
  )
}

export default ClusterMetrics;