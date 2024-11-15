<template>
  <el-card style="width: 100%" shadow="never">
    <template #header>
      <div class="card-header">
        <span>系统配置</span>
      </div>
    </template>
    <el-form :model="formData" :rules="formRules" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip content="1元=多少积分" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                点数比例
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入点数比例" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开发者提成比例">
            <el-input v-model="formData.name" placeholder="请输入开发者提成比例" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邀请提成">
            <el-input v-model="formData.name" placeholder="请输入邀请提成" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册状态">
            <el-radio-group v-model="formData.name">
              <el-radio :value="0" label="开启"></el-radio>
              <el-radio :value="1" label="关闭"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邀请码注册">
            <el-radio-group v-model="formData.name">
              <el-radio :value="0" label="无"></el-radio>
              <el-radio :value="1" label="选填"></el-radio>
              <el-radio :value="2" label="必填"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户点击表头排序最小间隔">
            <el-input v-model="formData.name" placeholder="请输入用户点击表头排序最小间隔" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="余额不足每日最多几次手机提醒">
            <el-input v-model="formData.name" placeholder="请输入余额不足每日最多几次手机提醒" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首页中自动刷新时间间隔">
            <el-input v-model="formData.name" placeholder="请输入首页中自动刷新时间间隔" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户公告充值提醒设置">
            <el-radio-group v-model="formData.name">
              <el-radio :value="0" label="提醒"></el-radio>
              <el-radio :value="1" label="关闭提醒"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开发者公告充值醒设置">
            <el-radio-group v-model="formData.name">
              <el-radio :value="0" label="提醒"></el-radio>
              <el-radio :value="1" label="关闭提醒"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客服信息公告充值醒设置">
            <el-radio-group v-model="formData.name">
              <el-radio :value="0" label="提醒"></el-radio>
              <el-radio :value="1" label="关闭提醒"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip content="0表示一直有,别的表示出现次数" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                弹窗广告出现次数
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入弹窗广告出现次数" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <template #label>
              <span>
                <el-tooltip content="空表示全部群体,[1,2]表示用户id" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                弹窗广告出现群体
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入弹窗广告出现群体" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <template #label>
              <span>
                <el-tooltip content="0表示必须手动关闭,别的是秒为单位自动关闭" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                弹窗广告关闭时间
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入弹窗广告关闭时间" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="短信单价">
            <el-input v-model="formData.name" placeholder="请输入短信单价" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最低提现金额">
            <el-input v-model="formData.name" placeholder="请输入最低提现金额" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip content="小时为单位，超过的自动清理掉,0表示不清理" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                识别明细保留时间
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入识别明细保留时间" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip content="小时为单位，超过的自动清理掉,0表示不清理" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                识别失败保留
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入识别失败保留" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip content="天为单位，过期的清理掉，超过的自动清理掉,0表示不清理" placement="top">
                  <el-icon>
                    <question-filled />
                  </el-icon>
                </el-tooltip>
                识别统计保留时间
              </span>
            </template>
            <el-input v-model="formData.name" placeholder="请输入识别统计保留时间" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer" style="display: flex;flex-direction: row;justify-content: flex-end;">
      <el-button type="primary">保存</el-button>
    </div>
  </el-card>
</template>

<script setup>
  import { ref } from 'vue';

  const formData = ref({});
  const formRules = ref({});
</script>

<style lang="scss" scoped></style>
