<template>
	<div id="newleadboards">
		<SectionTitle :title="'New Leadboards'">
			<i class="iconfont icon-paihangbang1"> </i>
		</SectionTitle>
		<table class="el-table">
			<thead>
				<th v-for="item in leadboards" :key="item.id">{{ item.name }}</th>
			</thead>
			<tbody>
				<tr v-for="(rowData, rowIdx) in tableData" :key="rowIdx">
					<td v-for="(track, colIdx) in rowData" :key="colIdx">
						<div class="playlist">
							<span class="no">{{ rowIdx + 1 }}</span>
							<div class="item-wrapper">
								<span class="name">{{ track.name }}</span>
								<div class="buttons">
									<i class="iconfont icon-rebang" @click="playAudio(track)">
									</i>
									<i class="iconfont icon-rebang"> </i>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr v-if="tableData.length > 0">
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
					<td class="viewAll">
						<el-button size="small">View Full List</el-button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import { getToplist, getAudioUrl } from "@/network/request";

export default {
	data() {
		return {
			leadboards: [],
			tableData: [],
		};
	},

	components: {
		SectionTitle,
	},

	methods: {
		async playAudio({ id }) {
			const { data: audio } = await getAudioUrl(id);
			if (!audio.data[0].url) {
				return this.$message.error(
					"This track is only available to VIP user！"
				);
			} else {
				this.$store.state.audioUrl = audio.data[0].url;
			}
		},
	},

	// leadboards ids: 60198, 180106, 11641012, 120001
	async created() {
		let timestamp = Date.now();
		let data = await Promise.all([
			Promise.resolve(getToplist({ id: 60198, timestamp })),
			Promise.resolve(getToplist({ id: 180106, timestamp })),
			Promise.resolve(getToplist({ id: 11641012, timestamp })),
			Promise.resolve(getToplist({ id: 120001, timestamp })),
		]);

		data = data.map((data) => {
			let {
				id,
				name,
				desc,
				coverImgUrl,
				trackIds,
				tracks,
				playCount,
			} = data.data.playlist;
			return { id, name, desc, coverImgUrl, trackIds, tracks, playCount };
		});

		this.leadboards = data;
		for (let i = 0; i < 20; i++) {
			this.tableData.push([
				{ name: data[0].tracks[i].name, id: data[0].trackIds[i].id },
				{ name: data[1].tracks[i].name, id: data[1].trackIds[i].id },
				{ name: data[2].tracks[i].name, id: data[2].trackIds[i].id },
				{ name: data[3].tracks[i].name, id: data[3].trackIds[i].id },
			]);
		}

		this.leadboards[0].name = "Billboard(Weekly)";
		this.leadboards[1].name = "UK Charts(Weekly)";
		this.leadboards[2].name = "iTunes(Weekly)";
		this.leadboards[3].name = "Hit FM Top(Weekly)";
	},
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";

#newleadboards {
	.playlist {
		display: flex;
		span.no {
			width: 20px;
			padding-right: 10px;
			text-align: right;
		}

		.item-wrapper {
			flex: 1;
			@include flex-align(row, space-between, flex-start);
			.buttons {
				visibility: hidden;
			}
			&:hover {
				cursor: pointer;
				.name {
					text-decoration: underline;
				}
				.buttons {
					visibility: visible;
					i {
						padding: 0 5px;
					}
				}
			}
		}
	}

	.el-table th {
		text-align: center;
		background-color: #f4f4f4;
		color: black;
	}

	.el-table td {
		padding-left: 20px;
		padding-right: 20px;
		width: 25%;
	}

	// the first 3 songs are in dark red
	tbody tr:nth-child(-n + 3) .no {
		color: rgb(196, 16, 16);
	}

	table {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid #0094ff;
	}

	table th,
	table td {
		border-left: 1px solid #0094ff;
		border-right: 1px solid #0094ff;
	}

	table tr:last-child td {
		border-bottom: 1px solid #0094ff;
		text-align: center;
	}

	table th {
		font-weight: bold;
		background-color: #f4f4f4;
	}

	table tr:nth-child(even) {
		background-color: #f4f4f4;
	}

	table tr:nth-child(odd) {
		background-color: #e8e8e8;
	}
}
</style>
